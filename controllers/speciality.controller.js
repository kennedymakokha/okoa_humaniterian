import expressAsyncHandler from "express-async-handler"
import Specility from '../models/specialities.model.js'
import { CustomError } from "../midddlewares/custom_error_middleware.js";
import { validateCourseInput } from "../validators/course.validation.js";

const get_specility = expressAsyncHandler(async (req, res) => {
    try {
        const e = res.paginate
        res.status(200).json(e)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error Ocured try again", error })
    }
})
const create_specility = expressAsyncHandler(async (req, res) => {
    try {
        // CustomError(validateCourseInput, req.body, res)

        const specility = await Specility.findOne({
            speciality_name: req.body.speciality_name
        });

        if (specility) {
            return res.status(402).json("Specility Exists !!");
        }
        req.body.createdBy = req.user._id
        await Specility.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const delete_specility = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Specility.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);

    }
})
const update_specility = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Specility.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'Updated failed ' })
    }
})

export {
    get_specility, create_specility, update_specility, delete_specility
}