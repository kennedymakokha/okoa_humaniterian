

import express from 'express'

import { isAuth } from '../midddlewares/auth.middleware.js'
import { create_specility, delete_specility, get_specility, update_specility } from '../controllers/speciality.controller.js'
import paginated from '../paginate/speciality.paginate.js'
import Speciality from './../models/specialities.model.js'
const router = express.Router()

router.route('/')
    .get([paginated(Speciality)], isAuth, get_specility)
    .post(isAuth, create_specility)
router.route('/:id')
    .delete(isAuth, delete_specility)
    .put(isAuth, update_specility)

export default router 