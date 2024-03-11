/**
 * Provides utilities to date.
 */
export const DateUtils = {
    /**
     * Format Date to string.
     */
    formatDateToString: (
        date: Date,
    ): string | null | undefined => {
        if (!date) {
            return date
        }

        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }
}