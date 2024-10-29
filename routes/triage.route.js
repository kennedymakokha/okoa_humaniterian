

import express from 'express'

import { isAuth } from '../midddlewares/auth.middleware.js'
import { get_triage, create_triage, update_triage, delete_triage } from '../controllers/triage.controller.js'
import paginated from '../paginate/triage.paginate.js'
import Triage from '../models/triage.model.js'
const router = express.Router()

router.route('/')
    .get([paginated(Triage)], isAuth, get_triage)
    .post(isAuth, create_triage)
router.route('/:id')
    .delete(isAuth, update_triage)
    .put(isAuth, delete_triage)
// .get(protect, getArea)
export default router 