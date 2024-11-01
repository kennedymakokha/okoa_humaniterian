import { apiSlice } from "./apiSlice";
const USER_URL = "/api/tests";

export const testsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create_tests: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),

        fetch_testss: builder.query({
            query: (data) => `${USER_URL}?page=${data.page}&limit=${data.limit}&word=${data.word}`
        }),
        update_tests: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        delete_tests: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })

    })
})

export const { useCreate_testsMutation, useDelete_testsMutation, useFetch_testssQuery, useUpdate_testsMutation } = testsApiSlice