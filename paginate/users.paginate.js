
const paginated = (model) => {

    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const count = await model.countDocuments().exec()
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const pager = Math.trunc(count / limit)
        const results = {}
        const admin = {}

        if (pager > 1) {
            results.pager = pager
        }

        if (endIndex < model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit,

            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit,

            }
        }



        try {

            var { word, role,course } = req.query
            var searchKey = new RegExp(`${word}`, 'i')
            if (word) {
                results.results = await model.find({ deletedAt: null, $or: [{ name: searchKey }, { phone_number: searchKey }] }).limit(limit).skip(startIndex).populate('createdBy', 'name').select("-verification_code -deletedAt -activated -createdBy").populate("course", "course_name course_duration").populate('guardian')
                    .exec()
                res.paginate = { results }
                next()

            }
            if (role) {
                results.results = await model.find({ role, deletedAt: null }).limit(limit).skip(startIndex).populate('createdBy', 'name').select("-verification_code -deletedAt -activated -createdBy").populate("course", "course_name course_duration").populate('guardian')
                    .exec()
                res.paginate = { results }
                next()

            }

            if (course) {
                results.results = await model.find({ course:course, deletedAt: null }).limit(limit).skip(startIndex).populate('createdBy', 'name').select("-verification_code -deletedAt -activated -createdBy").populate("course", "course_name course_duration").populate('guardian')
                    .exec()
                res.paginate = { results }
                next()

            }

            else {
                results.results = await model.find({ deletedAt: null }).limit(limit).skip(startIndex).populate('createdBy', 'name').select("-verification_code -deletedAt -activated -createdBy").populate("course", "course_name course_duration").populate('guardian')
                    .exec()
                res.paginate = { results }
                next()
            }

        } catch (error) {
            res.status(400).json({ message: error.message })
        }

        // await model.slice(startIndex, endIndex)

    }

}

export default paginated
