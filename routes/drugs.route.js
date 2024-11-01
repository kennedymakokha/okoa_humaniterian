

import express from 'express'

import { isAuth } from '../midddlewares/auth.middleware.js'
import { get_drugs, upload_drugs, create_drugs, update_drugs, delete_drugs } from '../controllers/drugs.controller.js'
import paginated from '../paginate/drug.paginate.js'
import Drug from '../models/drugs.model.js'
const router = express.Router()

router.route('/')
    .get([paginated(Drug)], isAuth, get_drugs)
    .post(isAuth, create_drugs)
router.route('/upload')
    .post(isAuth, upload_drugs)
router.route('/:id')
    .delete(isAuth, delete_drugs)
    .put(isAuth, update_drugs)

export default router 