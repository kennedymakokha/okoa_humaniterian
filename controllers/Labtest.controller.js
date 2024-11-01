import expressAsyncHandler from "express-async-handler"
import User from '../models/patients.model.js'
import Observation from '../models/observation.model.js'
import LabTest from '../models/labTest.model.js'
import { CustomError } from "../midddlewares/custom_error_middleware.js";
import { validateCourseInput } from "../validators/course.validation.js";
import axios from "axios";
import https from 'https';
import { TestsArray } from "../data.js";


const get_tests = expressAsyncHandler(async (req, res) => {
    try {
        const e = res.paginate
        res.status(200).json(e)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error Ocured try again", error })
    }
})
const get_labTest_user = expressAsyncHandler(async (req, res) => {
    try {
        const e = await Observation.find({ patient_id: req.params.id })
        res.status(200).json(e)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error Ocured try again", error })
    }
})
const get_user_lab = expressAsyncHandler(async (req, res) => {
    try {
        const e = await LabTest.find({ observation_id: req.params.id }).populate('test_id').populate('observation_id')
        res.status(200).json(e)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error Ocured try again", error })
    }
})



const create_Lab_tests = expressAsyncHandler(async (req, res) => {
    try {
        let observation = await Observation.create({
            patient_id: req.body.patient_id,
            observation: req.body.observation,
        })
        let i = 0;
        while (i < req.body.tests.length) {
            let element = req.body.tests[i]
            await LabTest.create({
                observation_id: observation._id,
                test_id: element._id,
            })
            i++;
        }

        await User.findOneAndUpdate({ _id: req.body.patient_id }, { state: "lab" }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const post_Lab_results = expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    try {
        let i = 0;
        while (i < req.body.tests) {
            let element = req.body[i]
            await LabTest.findOneAndUpdate({
                observation_id: element.observation,
                test_id: element.test,
            }, { outcome: element.outcome }, { new: true, useFindAndModify: false })
            i++;
        }
        await User.findOneAndUpdate({ _id: req.body.patient_id }, { state: "doctors-table-after" }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})

export {
    get_labTest_user,
    create_Lab_tests,
    get_user_lab,
    post_Lab_results
}