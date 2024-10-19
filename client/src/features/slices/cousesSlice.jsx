import { apiSlice } from "./apiSlice";
const USER_URL = "/api/courses";

export const CourseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        create_course: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}`,
                method: "POST",
                body: data
            })
        }),

        fetch_courses: builder.query({
            query: () => `${USER_URL}`
        }),
        delete_course: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            })
        })

    })
})

export const { useCreate_courseMutation,useDelete_courseMutation, useFetch_coursesQuery } = CourseApiSlice