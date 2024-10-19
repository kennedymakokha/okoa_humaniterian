import expressAsyncHandler from "express-async-handler"
import Course from '../models/courses.model.js'
import { CustomError } from "../midddlewares/custom_error_middleware.js";
import { validateCourseInput } from "../validators/course.validation.js";

const get_courses = expressAsyncHandler(async (req, res) => {
    try {
        const data = await Course.find({ deletedAt: null }).populate("createdBy", "name")
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ message: "Error Ocured try again", error })
    }
})
const create_course = expressAsyncHandler(async (req, res) => {
    try {
        CustomError(validateCourseInput, req.body, res)
        const course = await Course.findOne({
            course_name:req.body.course_name
        });

        if (course) {
            return res.status(402).json("Course Exists !!");
        }
        req.body.createdBy = req.user._id
        await Course.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const delete_course = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Course.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);
       
    }
})

export {
    get_courses, create_course, delete_course
}