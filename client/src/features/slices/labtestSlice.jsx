import { apiSlice } from "./apiSlice";
const USER_URL = "/api/lab-tests";

export const testsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        post_tests: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),

        fetch_observations: builder.query({
            query: (data) => `${USER_URL}/${data}`
        }),
        fetch_lab_test: builder.query({
            query: (data) => `${USER_URL}/lab/${data}`
        }),
        post_results: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/post-results`,
                method: "PUT",
                body: data
            })
        }),
        // delete_tests: builder.mutation({
        //     query: (id) => ({
        //         url: `${USER_URL}/${id}`,
        //         method: "DELETE",
        //     })
        // })

    })
})

export const {usePost_resultsMutation, usePost_testsMutation,useFetch_observationsQuery,useFetch_lab_testQuery } = testsApiSlice