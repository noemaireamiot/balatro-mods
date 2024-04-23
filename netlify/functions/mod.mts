import {
    Config,
    Handler,
    HandlerContext,
    HandlerEvent,
} from '@netlify/functions'
import ModService from '@/sevices/ModService'
import { UrlUtils } from '@/utils/UrlUtils'

export async function handler(
    event: HandlerEvent,
    context: HandlerContext
): Handler {
    if (event.httpMethod === 'OPTIONS') {
        return {
            // A supprimer
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*',
            },
            statusCode: 200,
        }
    }

    if (!context.clientContext.user) {
        return {
            body: '[ERROR] Unauthorized',
            statusCode: 401,
        }
    }
    const methodFunction = {
        POST: createMod,
        PUT: updateMod,
        DELETE: deleteMod,
        GET: searchMod,
    }

    if (!(event.httpMethod in methodFunction)) {
        return {
            body: '[ERROR] Invalid HTTP Method',
            statusCode: 400,
        }
    }

    try {
        let body = null

        if (event.httpMethod !== 'GET') {
            body = {
                ...JSON.parse(event.body),
                email: context.clientContext.user.email,
                username: context.clientContext.user.user_metadata.full_name,
            }
        } else {
            const urlParams = new URL(event.rawUrl)
            const params = UrlUtils.paramsToObject(
                urlParams.searchParams.entries()
            )
            body = params
        }

        return methodFunction[event.httpMethod](body)
    } catch (e) {
        return {
            body: `[ERROR] Invalid JSON - ${e.message}`,
            statusCode: 400,
        }
    }
}

export const config: Config = {}

const createMod = async (body) => {
    await ModService.creationMod(body)

    return {
        body: JSON.stringify({ message: 'Mod created successfully' }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
        },
        statusCode: 201,
    }
}

const updateMod = async (body) => {
    const mod_id = body.mod_id
    delete body.mod_id

    await ModService.updateMod(body, mod_id)

    return {
        body: JSON.stringify({ message: 'Mod updated successfully' }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
        },
        statusCode: 200,
    }
}

const deleteMod = async (body) => {
    return {
        body: JSON.stringify({ message: 'Mod deleted successfully' }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
        },
        statusCode: 200,
    }
}

const searchMod = async (searchQuery: searchQueryInterface) => {
    let results
    if (searchQuery.mod_id) {
        results = await ModService.getMod(searchQuery.mod_id)
    } else {
        results = await ModService.searchMods(searchQuery)
    }

    if (!results) {
        return {
            body: '[ERROR] Invalid Query',
            statusCode: 400,
        }
    }

    return {
        body: JSON.stringify(results),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
        },
        statusCode: 200,
    }
}
