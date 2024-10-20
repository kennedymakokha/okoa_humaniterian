import { apiSlice } from "./apiSlice";
const USER_URL = "/api/practicals";

export const pracApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create_prac: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),

        fetch_pracs: builder.query({
            query: (id) => `${USER_URL}?id=${id}`,
        }),
        delete_prac: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })

    })
})

export const { useCreate_pracMutation,useDelete_pracMutation, useFetch_pracsQuery } = pracApiSlice