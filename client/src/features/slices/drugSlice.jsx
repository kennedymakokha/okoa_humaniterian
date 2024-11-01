import { apiSlice } from "./apiSlice";
const USER_URL = "/api/drugs";

export const drugsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create_drugs: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),

        fetch_drugs: builder.query({
            query: (data) => `${USER_URL}?page=${data.page}&limit=${data.limit}&word=${data.word}`
        }),
        update_drugs: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        delete_drugs: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })

    })
})

export const {useCreate_drugsMutation,useDelete_drugsMutation,useFetch_drugsQuery,useUpdate_drugsMutation } = drugsApiSlice