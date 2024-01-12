export function getRequestConfig() {
    if (process.env.ENVIRONMENT === 'development') {
        return {
            headers: {
                "Authorization": `Bearer ${process.env.TOKEN}`
            }
        };
    } else {
        return {
            withCredentials: true
        };
    }
}