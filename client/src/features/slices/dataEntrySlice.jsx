import { apiSlice } from "./apiSlice";
const USER_URL = "/api/data-entry";

export const DataentryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        test_uploads: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),
        fetch_prac_result: builder.query({
            query: (id) => `${USER_URL}?id=${id}`,
        }),
    })
    
})

export const { useTest_uploadsMutation,useFetch_prac_resultQuery } = DataentryApiSlice