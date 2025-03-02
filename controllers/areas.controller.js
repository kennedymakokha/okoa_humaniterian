import expressAsyncHandler from "express-async-handler"
import Area from '../models/areas.model.js'


const get_areas = expressAsyncHandler(async (req, res) => {
    try {
        const e = res.paginate
        res.status(200).json(e)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "Error Ocured try again", error })
    }

})

const create_areas = expressAsyncHandler(async (req, res) => {
    try {
       
        const tests = await Area.findOne({
            area_name: req.body.area_name
        });

        if (tests) {
            return res.status(402).json("Area aready in the system !!");
        }
        req.body.createdBy = req.user._id
        await Area.create(req.body)
        return res.status(200).json({ message: 'Created Successfull' })
    } catch (error) {
        console.log(error)
    }
})
const delete_areas = expressAsyncHandler(async (req, res) => {
    try {
        let deleted = await Area.findOneAndUpdate({ _id: req.params.id }, { deletedAt: Date() }, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: ' deleted successfully ', deleted })
    } catch (error) {
        return res.status(404);

    }
})
const update_areas = expressAsyncHandler(async (req, res) => {
    try {
        let updates = await Area.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false })
        return res.status(200).json({ message: 'Updated successfully ', updates })
    } catch (error) {
        return res.status(400).json({ message: 'Updated failed ' })
    }
})

export {
    get_areas,  create_areas, update_areas, delete_areas
}