import expressAsyncHandler from "express-async-handler"
import Test from '../models/tests.model.js'
import { CustomError } from "../midddlewares/custom_error_middleware.js";
import { validateCourseInput } from "../validators/course.validation.js";
import axios from "axios";
import https from 'https';
import { TestsArray } from "../data.js";

const agent = new https.Agent({
    rejectUnauthorized: false, // Warning: Use with caution!
});
const get_tests = expressAsyncHandler(async (req, res) => {
    try {
        const e = res.paginate
        res.status(200).json(e)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error Ocured try again", error })
    }
})
const get_fingerPrint = expressAsyncHandler(async (req, res) => {
    try {
        const response = await axios.get('https://localhost:8443/SGIFPCapture'); // Replace with your API URL
        console.log(response)
        return res.json(response.data);
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error Ocured try again", error })
    }
})

const upload_tests = expressAsyncHandler(async (req, res) => {
    try {

        for (let index = 0; index < TestsArray.length; index++) {
            const element = TestsArray[index];
            req.body.test_name = element
            req.body.createdBy = req.user._id
            await Test.create(req.body)

        }

        return res.status(200).json({ message: 'upload Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const create_tests = expressAsyncHandler(async (req, res) => {
    try {
        // CustomError(validateCourseInput, req.body, res)

        const tests = await Test.findOne({
            test_name: req.body.test_name
        });

        if (tests) {
            return res.status(402).json("tests Exists !!");
        }
        req.body.createdBy = req.user._id
        await Test.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const delete_tests = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Test.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);

    }
})
const update_tests = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Test.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'Updated failed ' })
    }
})

export {
    get_tests, upload_tests, create_tests, get_fingerPrint, update_tests, delete_tests
}