/**
 * Provides utilities to url.
 */
export const UrlUtils = {
    /**
     * UrlParams to object.
     */
    paramsToObject: (entries: any) => {
        const result: any = {}
        for (const [key, value] of entries) {
            // each 'entry' is a [key, value] tupple
            result[key] = value
        }
        return result
    },
}
