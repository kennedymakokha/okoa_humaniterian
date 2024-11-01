import { apiSlice } from "./apiSlice";
const USER_URL = "/api/triage";

export const triageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create_triage: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),

        fetch_triages: builder.query({
            query: (data) => `${USER_URL}?page=${data.page}&limit=${data.limit}&word=${data.word}&patient=${data.patient}`
        }),
        fetch_patient_triages: builder.query({
            query: (data) => `${USER_URL}/${data}`
        }),
        update_triage: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        delete_triage: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })

    })
})

export const {useFetch_patient_triagesQuery, useCreate_triageMutation, useDelete_triageMutation, useFetch_triagesQuery, useUpdate_triageMutation } = triageApiSlice