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
    createMod: async (): Promise<Response> => {
        return fetch(
            'https://balatro-mods.netlify.app/.netlify/functions/mod',
            {
                method: 'GET',
                headers: generateHeaders(),
            }
        )
    },
}
