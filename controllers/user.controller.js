import expressAsyncHandler from "express-async-handler"
import User from '../models/auth.model.js'
import Guardian from '../models/guardian.model.js'
import Speciality from '../models/specialities.model.js'
import Fee from '../models/fee.model.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CustomError } from "../midddlewares/custom_error_middleware.js";

import { validateGuardianInput, validateUserInput, validateUserLoginInput } from "../validators/user.validation.js";
import { Format_phone_number, MakeActivationCode, ValidityFunc } from "../helpers/common.helper.js";

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
        if (latestRecord[0]?.adm_no === undefined) {
            newNumber = 1
        } else {
            let str = latestRecord[0].reg_no.split("/")[2].split("-")[1];;
            newNumber = parseInt(str[2]) + 1
        }
        const admi_no = newNumber.toString().padStart(4, '0');

        if (!req.body.password) {
            req.body.password = `Af${req.body.phone_number}!`
            req.body.confirm_password = `Af${req.body.phone_number}!`
        }

        CustomError(validateUserInput, req.body, res)
        req.body.phone_number = await Format_phone_number(req.body.phone_number); //format the phone number
        const phone = await User.findOne({
            $or: [
                { ID_no: req.body.ID_no },
                { phone_number: req.body.phone_number, }
            ]
        });

        if (phone) {
            return res.status(400).json({ message: 'User Exists !! ' })
        }
        const systemUser = await Speciality.findOne({ speciality_name: "system user" })

        req.body.specialization = req.body.speciality ? req.body.speciality : systemUser._id

        req.body.createdBy = req.user._id
        req.body.verification_code = MakeActivationCode(5);
        req.body.reg_no = `HMS/2024/${req.body.role === "doctors" ? "DOC" : req.body.role === "nurses" ? "NUR" : req.body.role === "receptionists" ? "REC" : req.body.role === "pharmacists" ? "PHR" : req.body.role === "lab tech" ? "LAB" : req.body.role === "accountants" ? "ACC" : "GNR"}-${admi_no}`
        req.body.hashPassword = bcrypt.hashSync(req.body.password, 10);
        let data = await User.create(req.body)

        return res.status(200).json(data._id)
    } catch (error) {
        console.log(error)
    }
})

export const login_user = expressAsyncHandler(async (req, res) => {
    try {
        CustomError(validateUserLoginInput, req.body, res)
        req.body.phone_number = await Format_phone_number(req.body.phone_number); //format the phone number
        let user = {};
        let userOBJ = await User.findOne({ phone_number: req.body.phone_number });

        if (!userOBJ) {
            return res
                .status(402)
                .json({ message: "Authentication failed with wrong credentials!!" });
        }

        if (userOBJ) {
            const password_match = await userOBJ.comparePassword(
                req.body.password,
                userOBJ.hashPassword
            );
            if (!password_match) {
                return res
                    .status(402)
                    .json({ message: "Authentication failed with wrong credentials!!" });
            }
            const token = await jwt.sign(
                { email: userOBJ.email, _id: userOBJ._id },
                process.env.JWT_KEY
            );
            user.token = token;
            user.name = `${userOBJ.name}`;
            user._id = userOBJ._id;
            user.role = userOBJ.role;
            return res.status(200).json(user);
        }
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ success: false, message: "operation failed ", error });
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

export const update_user = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'Updated failed ' })
    }
})

export const Enroll_user = expressAsyncHandler(async (req, res) => {
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





