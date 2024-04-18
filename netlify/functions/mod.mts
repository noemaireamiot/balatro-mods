import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb'
import { Config, Context } from '@netlify/functions'

export default async (req: Request, context: Context) => {
    const res = new Response()

    // To delete
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.append('Access-Control-Allow-Headers', '*')
    res.headers.append('Access-Control-Allow-Methods', '*')

    // TOTO vérifier que l'utilisateur est connecté

    const methodFunction = {
        POST: createMod,
        PUT: updateMod,
        DELETE: deleteMod,
    }

    // TODO Get user info
    console.log(context)

    if (!(req.method in methodFunction)) {
        // To delete
        return res

        // return (
        //     'Invalid HTTP method',
        //     {
        //         status: 400,
        //     }
        // )
    }

    const client = new DynamoDBClient({
        region: 'eu-west-3',
    })
    const command = new ListTablesCommand({})
    const results = await client.send(command)
    // console.log(results)
    // console.log(command)

    try {
        const body = await req.json()

        console.log(body)

        return methodFunction[req.method](body)
    } catch (e) {
        return new Response(`[ERROR] Invalid JSON - ${e.message}`, {
            status: 400,
        })
    }
}

export const config: Config = {}

const createMod = async (body) => {
    const res = new Response()

    // To delete
    res.headers.set('Access-Control-Allow-Origin', '*')
    res.headers.append('Access-Control-Allow-Headers', '*')
    res.headers.append('Access-Control-Allow-Methods', '*')
    return res
}

const updateMod = (body) => {
    console.log('update')
    return new Response('Mod updated')
}
const deleteMod = (body) => {
    console.log('delete')
    return new Response('Mod deleted')
}
