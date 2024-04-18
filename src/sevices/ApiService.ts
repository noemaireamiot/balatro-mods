import { modInterface } from '@/types/mod.types'
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
    createMod: async (mod: modInterface): Promise<Response> => {
        return fetch('/.netlify/functions/mod', {
            method: 'GET',
            headers: generateHeaders(),
        })
    },
}
