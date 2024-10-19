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



    })
})

export const { useTest_uploadsMutation } = DataentryApiSlice