import expressAsyncHandler from "express-async-handler"
import Prac from '../models/practicals.model.js'
import { CustomError } from "../midddlewares/custom_error_middleware.js";

const get_Practical = expressAsyncHandler(async (req, res) => {
    try {
        const data =  await Prac.find({ deletedAt: null ,course:req.query.id}).populate("createdBy", "name").populate("course", "course_name")
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ message: "Error Ocured try again", error })
    }
})
const create_Practical = expressAsyncHandler(async (req, res) => {
    try {
        // CustomError(validatePracticalInput, req.body, res)
        // const prac = await Prac.findOne({
        //     prac_name:req.body.prac_name,
        //     course:req.body.course
        // });

        // if (prac) {
        //     return res.status(402).json("prac Exists !!");
        // }
        console.log(req.body)
        req.body.createdBy = req.user._id
        await Prac.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const delete_prac = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Prac.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);
       
    }
})

export {
    get_Practical, delete_prac,create_Practical
}