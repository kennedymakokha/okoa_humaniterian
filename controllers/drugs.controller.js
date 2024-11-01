import expressAsyncHandler from "express-async-handler"
import Drug from '../models/drugs.model.js'
import { CustomError } from "../midddlewares/custom_error_middleware.js";
import { validateCourseInput } from "../validators/course.validation.js";
import axios from "axios";
import https from 'https';
import { TestsArray } from "../data.js";

const agent = new https.Agent({
    rejectUnauthorized: false, // Warning: Use with caution!
});
const get_drugs = expressAsyncHandler(async (req, res) => {
    try {
        const e = res.paginate
        res.status(200).json(e)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error Ocured try again", error })
    }

})
const upload_drugs = expressAsyncHandler(async (req, res) => {
    try {

        for (let index = 0; index < TestsArray.length; index++) {
            const element = TestsArray[index];
            req.body.test_name = element
            req.body.createdBy = req.user._id
            await Drug.create(req.body)

        }

        return res.status(200).json({ message: 'upload Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const create_drugs = expressAsyncHandler(async (req, res) => {
    try {
        // CustomError(validateCourseInput, req.body, res)
        console.log(req.body)
        const tests = await Drug.findOne({
            test_name: req.body.drug_name
        });

        if (tests) {
            return res.status(402).json("Drug aready in the system !!");
        }
        req.body.createdBy = req.user._id
        
        await Drug.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const delete_drugs = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Drug.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);

    }
})
const update_drugs = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Drug.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'Updated failed ' })
    }
})

export {
    get_drugs, upload_drugs, create_drugs, update_drugs, delete_drugs
}