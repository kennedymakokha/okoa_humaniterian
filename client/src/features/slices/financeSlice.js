
import { apiSlice } from "./apiSlice";
const USER_URL = "/api/finances";

export const financeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetch_user_finances: builder.query({
            query: (data) => ({
                url: `${USER_URL}/${data.id}?word=${data.word}`
            })
        }),
        get_users_finances: builder.query({
            query: (data) => `${USER_URL}?page=${data.page}&limit=${data.limit}&word=${data.word}`
        }),

        update_user_finances: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.student}`,
                method: "PUT",
                body: data
            })
        }),

    })
})

export const { useFetch_user_financesQuery, useGet_users_financesQuery, useUpdate_user_financesMutation } = financeSlice