import { apiSlice } from "./apiSlice";
const USER_URL = "/api/patients";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        post_patients: builder.mutation({
            query: (data) => {

                return {
                    url: `${USER_URL}/`,
                    method: "POST",
                    body: data
                }
            }
        }),
        validate_input_patients: builder.mutation({
            query: (data) => {

                return {
                    url: `${USER_URL}/validate-input`,
                    method: "POST",
                    body: data
                }
            }
        }),
        post_guardian: builder.mutation({
            query: (data) => {

                return {
                    url: `${USER_URL}/guardian`,
                    method: "POST",
                    body: data
                }
            }
        }),
        edit_patient: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data._id}`,
                method: "PUT",
                body: data
            })
        }),
        admit_patient: builder.mutation({
            query: (_id) => ({
                url: `${USER_URL}/enroll/${_id}`,
                method: "PUT",

            })
        }),
        fetch_patient: builder.query({
            query: (id) => ({
                url: `${USER_URL}/${id}`
            })
        }),
        get_patients: builder.query({
            query: (data) => `${USER_URL}?page=${data.page}&limit=${data.limit}&word=${data.word}&state=${data.state}`
        }),
        delete_patient: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        }),


    })
})

export const { useValidate_input_patientsMutation, usePost_guardianMutation, usePost_patientsMutation, useAdmit_patientMutation, useDelete_patientMutation, useEdit_patientMutation, useFetch_patientQuery, useGet_patientsQuery, } = usersApiSlice