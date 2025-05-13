import { Api } from "./__generated__/Api";

export const apiV1 = new Api({
    baseURL: `${import.meta.env.VITE_API_URL}`,
})

