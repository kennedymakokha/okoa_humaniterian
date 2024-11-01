import expressAsyncHandler from "express-async-handler"
import User from '../models/patients.model.js'
import Guardian from '../models/guardian.model.js'
import Speciality from '../models/specialities.model.js'
import Fee from '../models/fee.model.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../midddlewares/custom_error_middleware.js";

import { validateGuardianInput, validateUserInput, validateUserLoginInput } from "../validators/user.validation.js";
import { Format_phone_number, MakeActivationCode, ValidityFunc } from "../helpers/common.helper.js";
import { Mpesa_stk } from "../helpers/stk.helper.js"

export const get_users = expressAsyncHandler(async (req, res) => {
    try {
        const e = res.paginate
        res.status(200).json(e)

    } catch (error) {
        res.status(500).json(error)
    }
})

export const create_user = expressAsyncHandler(async (req, res) => {
    try {
        const latestRecord = await User.find().sort({ createdAt: -1 }).limit(1);
        let newNumber

        if (latestRecord[0]?.reg_no === undefined) {
            newNumber = 1
        } else {
            let str = latestRecord[0].reg_no.split("/")[2].split("-")[1];
            newNumber = parseInt(str) + 1
            console.log(str)
        }


        const reg_no = newNumber.toString().padStart(4, '0');
        req.body.createdBy = req.user._id
        req.body.reg_no = `HMS/2024/PNT-${reg_no}`
        let data = await User.create(req.body)
        // await Mpesa_stk(
        //     req.body.phone_number,
        //     1,
        //     req.user._id,
        // );
        await User.findOneAndUpdate({ _id: data._id }, { state: "triage-table" }, { new: true, useFindAndModify: false })

        return res.status(200).json(data._id)
    } catch (error) {
        console.log(error)
    }
})
export const validate_input_user = expressAsyncHandler(async (req, res) => {
    try {

        CustomError(validateUserInput, req.body, res)
        req.body.phone_number = await Format_phone_number(req.body.phone_number); //format the phone number
        const phone = await User.findOne({
            $or: [
                { ID_no: req.body.ID_no },
                // { phone_number: req.body.phone_number, }
            ]
        });

        if (phone) {
            return res.status(400).json({ message: 'User Exists !! ' })
        }

        return res.status(200).json(req.body)
    } catch (error) {
        console.log(error)
    }
})



export const delete_user = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await User.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);

    }
})
export const count_patients = expressAsyncHandler(async (req, res) => {
    try {
        let patients = await User.find({ deletedAt: null })
        let triage_table = patients.filter(e => e.state == "triage-table").length
        let doctors_table = patients.filter(e => e.state == "doctors-table").length
        let lab = patients.filter(e => e.state == "lab").length
        let doctors_table_after = patients.filter(e => e.state == "doctors-table-after").length
        let pharmacy = patients.filter(e => e.state == "pharmacy").length
        // "triage-table", "doctors-table", "lab", "doctors-table_after", "pharmacy"
        return res.status(200).json({ triage: triage_table, doctableB4: doctors_table, lab: lab, doctableafter: doctors_table_after, pharmacy: pharmacy })
    } catch (error) {
        return res.status(404);

    }
})

export const update_user = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'Updated failed ' })
    }
})

export const admit_patient = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await User.findOneAndUpdate({ _id: req.params.id }, { enroled: true }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Updated failed ' })
    }
})

export const create_guardian = expressAsyncHandler(async (req, res) => {
    try {
        CustomError(validateGuardianInput, req.body, res)
        let data = await Guardian.create(req.body)
        let updates = await User.findOneAndUpdate({ _id: req.body.id }, { guardian: data._id }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'Updated failed ' })
    }
})





