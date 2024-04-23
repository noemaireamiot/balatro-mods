export interface modInformationsInterface {
    title: string
    description: string
}

export interface modInterface extends modInformationsInterface {
    email: string
    username: string
}

export interface searchQueryInterface {
    mod_id?: string
    q?: string
    exclusiveStartKey?: string
}
