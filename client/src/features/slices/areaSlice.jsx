import { apiSlice } from "./apiSlice";
const USER_URL = "/api/areas";

export const AreasApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create_areas: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),

        fetch_areas: builder.query({
            query: (data) => `${USER_URL}?page=${data.page}&limit=${data.limit}&word=${data.word}`
        }),
        update_areas: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        delete_areas: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })

    })
})

export const {useCreate_areasMutation,useDelete_areasMutation,useFetch_areasQuery,useUpdate_areasMutation} = AreasApiSlice