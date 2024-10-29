import expressAsyncHandler from "express-async-handler"
import User from '../models/triage.model.js'
import Patient from '../models/patients.model.js'
import Speciality from '../models/specialities.model.js'
import Fee from '../models/fee.model.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../midddlewares/custom_error_middleware.js";

import { validateGuardianInput, validateUserInput, validateUserLoginInput } from "../validators/user.validation.js";
import { Format_phone_number, MakeActivationCode, ValidityFunc } from "../helpers/common.helper.js";
import { validateTriageInput } from "../validators/triage.validation.js"

export const get_triage = expressAsyncHandler(async (req, res) => {
    try {
        const e = res.paginate
        res.status(200).json(e)

    } catch (error) {
        res.status(500).json(error)
    }
})

export const create_triage = expressAsyncHandler(async (req, res) => {
    try {
        CustomError(validateTriageInput, req.body, res)
        req.body.createdBy = req.user._id
        let data = await User.create(req.body)
        await Patient.findOneAndUpdate({ _id: req.body.patient_id }, { state: "doctors-table" }, { new: true, useFindAndModify: false })
        return res.status(200).json(data._id)
    } catch (error) {
        console.log(error)
    }
})
export const delete_triage = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await User.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);
    }
})
export const update_triage = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'Updated failed ' })
    }
})







