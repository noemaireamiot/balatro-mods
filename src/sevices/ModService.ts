import { modInterface, searchQueryInterface } from '@/types/mod.types'
import { v4 as uuidv4 } from 'uuid'
import {
    DeleteItemCommand,
    DynamoDBClient,
    GetItemCommand,
    ScanCommand,
    UpdateItemCommand,
} from '@aws-sdk/client-dynamodb'

const awsCredentialIdentity = {
    accessKeyId: process.env.AWS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_KEY || '',
}

const update = (
    tableName: string,
    primaryKeyName: string,
    primaryKeyValue: string,
    updates: modInterface | any
) => {
    const keys = Object.keys(updates)
    const keyNameExpressions = keys.map((name) => `#${name}`)
    const keyValueExpressions = keys.map((value) => `:${value}`)
    const UpdateExpression =
        'SET ' +
        keyNameExpressions
            .map((nameExpr, idx) => `${nameExpr} = ${keyValueExpressions[idx]}`)
            .join(', ')
    const ExpressionAttributeNames = keyNameExpressions.reduce(
        (exprs, nameExpr, idx) => ({ ...exprs, [nameExpr]: keys[idx] }),
        {}
    )
    const ExpressionAttributeValues = keyValueExpressions.reduce(
        (exprs, valueExpr, idx) => ({
            ...exprs,
            [valueExpr]: { S: updates[keys[idx]] },
        }),
        {}
    )

    return {
        TableName: tableName,
        Key: { [primaryKeyName]: { S: primaryKeyValue } },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
    }
}

export default {
    creationMod: async (mod: modInterface): Promise<any> => {
        const client = new DynamoDBClient({
            region: 'eu-west-3',
            credentials: awsCredentialIdentity,
        })

        const input = update('mods', 'mod_id', uuidv4(), mod)

        const command = new UpdateItemCommand(input)

        return await client.send(command)
    },
    updateMod: async (mod: modInterface, mod_id: string): Promise<any> => {
        const client = new DynamoDBClient({
            region: 'eu-west-3',
            credentials: awsCredentialIdentity,
        })

        const input = update('mods', 'mod_id', mod_id, mod)

        const command = new UpdateItemCommand(input)

        return await client.send(command)
    },
    deleteMod: async (mod_id: string): Promise<any> => {
        const client = new DynamoDBClient({
            region: 'eu-west-3',
            credentials: awsCredentialIdentity,
        })

        const input = {
            Key: {
                mod_id: {
                    S: mod_id,
                },
            },
            TableName: 'mods',
        }

        const command = new DeleteItemCommand(input)

        return await client.send(command)
    },
    searchMods: async (searchQuery: searchQueryInterface): Promise<any> => {
        const client = new DynamoDBClient({
            region: 'eu-west-3',
            credentials: awsCredentialIdentity,
        })

        let exclusiveStartKey = {}
        if (searchQuery?.exclusiveStartKey) {
            exclusiveStartKey = {
                ExclusiveStartKey: {
                    mod_id: {
                        S: searchQuery.exclusiveStartKey,
                    },
                },
            }
        }
        const input: any = {
            ExpressionAttributeValues: {
                ':search': {
                    S: searchQuery.q,
                },
            },
            FilterExpression:
                'contains(title, :search) or contains(description, :search)',
            TableName: 'mods',
            Limit: 20,
            ...exclusiveStartKey,
        }
        const command = new ScanCommand(input)
        return await client.send(command)
    },
    getMod: async (mod_id: string): Promise<any> => {
        const client = new DynamoDBClient({
            region: 'eu-west-3',
            credentials: awsCredentialIdentity,
        })

        const input = {
            Key: {
                mod_id: {
                    S: mod_id,
                },
            },
            TableName: 'mods',
        }
        const command = new GetItemCommand(input)
        return await client.send(command)
    },
}
