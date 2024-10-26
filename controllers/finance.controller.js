import expressAsyncHandler from "express-async-handler"
import Finance from '../models/finance.model.js'
import Fee from '../models/fee.model.js'
import Misc from '../models/miscpayments.model.js'
import { ValidityFunc } from "../helpers/common.helper.js"


export const get_finances = expressAsyncHandler(async (req, res) => {
    try {
        const e = res.paginate
        res.status(200).json(e)

    } catch (error) {
        res.status(500).json(error)
    }
})

export const get_user_finance = expressAsyncHandler(async (req, res) => {
    try {
        const e = res.paginate
        res.status(200).json(e)

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

export const update_user_finance = expressAsyncHandler(async (req, res) => {
    try {

        await Finance.create(req.body)

        let fee = await Fee.find({ student: req.params.id }).sort({ createdAt: -1 })
        let ar = parseInt(fee[0].arrears) - parseInt(req.body.amount)
        let updates = await Fee.findOneAndUpdate({ student: req.params.id }, { arrears: ar }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Updated failed ' })
    }
})


export const update_user_misc_payments = expressAsyncHandler(async (req, res) => {
    try {
        const { type } = req.query
        let misObj = await Misc.findOne({ student: req.body.student})
        let update

        if (misObj === null) {
            if (req.body.payment_for === "internent") {
                req.body.validity = ValidityFunc(Date(), 30)
                update = await Misc.create(req.body)
            } else {
                req.body.validity = ValidityFunc(Date(), 7)
                update = await Misc.create(req.body)
            }
        } else {
            const { payment_for } = req.body

            if (req.body.payment_for === "internent") {
                req.body.validity = ValidityFunc(Date(misObj.validity), 30)

            } else {
                console.log(ValidityFunc(Date("2024-12-06T07:17:12.000Z"), 8))
                req.body.validity = ValidityFunc(Date(misObj.validity), 7)

            }

            console.log(req.body)
            update = await Misc.findOneAndUpdate({ student: req.body.student,payment_for:req.body.payment_for }, req.body, { new: true, useFindAndModify: false })
        }





        // let 
        // console.log(req.body)
        //     { $set: req.body },
        //     { upsert: true, new: true },  //upsert to create a new doc if none exists and new to return the new, updated document instead of the old one. 
        //     function (err, doc) {
        //         if (err) {
        //             console.log("Something wrong when updating data!");
        //         }

        //         console.log(doc);
        //     });
        // await Finance.create(req.body)

        // let fee = await Fee.find({ student: req.params.id }).sort({ createdAt: -1 })
        // let ar = parseInt(fee[0].arrears) - parseInt(req.body.amount)
        // let updates = await Fee.findOneAndUpdate({ student: req.params.id }, { arrears: ar }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', update })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: 'Updated failed ' })
    }
})





