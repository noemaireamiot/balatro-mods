import {
    modInformationsInterface,
    searchQueryInterface,
} from '@/types/mod.types'
import netlifyIdentity from 'netlify-identity-widget'

const generateHeaders = () => {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }

    if (netlifyIdentity.currentUser()) {
        return {
            ...headers,
            Authorization: `Bearer ${netlifyIdentity.currentUser()?.token
                ?.access_token}`,
        }
    }

    return headers
}

export default {
    createMod: async (mod: modInformationsInterface): Promise<Response> => {
        return fetch('/.netlify/functions/mod', {
            method: 'POST',
            headers: generateHeaders(),
            body: JSON.stringify(mod),
        })
    },
    updateMod: async (
        mod: modInformationsInterface,
        mod_id: string
    ): Promise<Response> => {
        return fetch('/.netlify/functions/mod', {
            method: 'PUT',
            headers: generateHeaders(),
            body: JSON.stringify({ ...mod, mod_id }),
        })
    },
    deleteMod: async (mod_id: string): Promise<Response> => {
        return fetch('/.netlify/functions/mod', {
            method: 'DELETE',
            headers: generateHeaders(),
            body: JSON.stringify({ mod_id }),
        })
    },
    searchMods: async (
        searchQuery: searchQueryInterface
    ): Promise<Response> => {
        return fetch(
            `/.netlify/functions/mod?q=${searchQuery.q}${
                searchQuery.exclusiveStartKey
                    ? `exclusiveStartKey=${searchQuery.exclusiveStartKey}`
                    : ''
            }`,
            {
                method: 'GET',
                headers: generateHeaders(),
            }
        )
    },
    getMod: async (mod_id: string): Promise<Response> => {
        return fetch(`/.netlify/functions/mod?mod_id=${mod_id}`, {
            method: 'GET',
            headers: generateHeaders(),
        })
    },
}
