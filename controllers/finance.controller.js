import expressAsyncHandler from "express-async-handler"
import Finance from '../models/finance.model.js'
import Fee from '../models/fee.model.js'
import User from '../models/auth.model.js'


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
        let user = await User.findOne({ _id: req.params.id })
        console.log(user)
        // // if (req.body.for === "fee") {
        // //     req.body.validity = user.validity
        // // }
        // console.log(req.body)
        // return
        console.log(req.body)
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





