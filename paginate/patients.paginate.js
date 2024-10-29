
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
            var { word, state } = req.query
            var searchKey = new RegExp(`${word}`, 'i')
            if (word) {
                results.results = await model.find({ deletedAt: null, $or: [{ name: searchKey }, { phone_number: searchKey }, { reg_no: searchKey }, { ID_no: searchKey }] }).limit(limit).skip(startIndex).populate('createdBy', 'name').sort({ 'updatedAt': -1 }).select("-verification_code -deletedAt -activated -createdBy")
                    .exec()
                res.paginate = { results }
                next()

            }
            if (state) {
                if (state === "all") {
                    results.results = await model.find({ deletedAt: null }).limit(limit).skip(startIndex).populate('createdBy', 'name').sort({ 'updatedAt': -1 }).select("-verification_code -deletedAt -activated -createdBy")
                        .exec()
                    res.paginate = { results }
                    next()
                } else
                    results.results = await model.find({ deletedAt: null, state: state }).limit(limit).skip(startIndex).populate('createdBy', 'name').sort({ 'updatedAt': -1 }).select("-verification_code -deletedAt -activated -createdBy")
                        .exec()
                res.paginate = { results }
                next()

            }
            else {
                results.results = await model.find({ deletedAt: null }).limit(limit).skip(startIndex).populate('createdBy', 'name').sort({ 'updatedAt': -1 }).select("-verification_code -deletedAt -activated -createdBy")
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
