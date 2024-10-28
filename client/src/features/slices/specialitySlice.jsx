import { apiSlice } from "./apiSlice";
const USER_URL = "/api/speciality";

export const specialityApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create_speciality: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),

        fetch_specialitys: builder.query({
            query: (data) => `${USER_URL}?page=${data.page}&limit=${data.limit}&word=${data.word}`
        }),
        update_speciality: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        delete_speciality: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })

    })
})

export const { useCreate_specialityMutation, useDelete_specialityMutation, useFetch_specialitysQuery, useUpdate_specialityMutation } = specialityApiSlice