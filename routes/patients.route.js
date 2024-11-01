

import express from 'express'
import { isAuth } from '../midddlewares/auth.middleware.js'
import { admit_patient, count_patients, create_guardian, create_user, delete_user, get_users, update_user, validate_input_user } from '../controllers/patients.controller.js'
import User from '../models/patients.model.js'
import paginated from '../paginate/patients.paginate.js'
const router = express.Router()

router.route('/')
    .get([paginated(User)], isAuth, get_users)
    .post(isAuth, create_user)
router.route('/guardian')
    .post(isAuth, create_guardian)
router.route('/validate-input')
    .post(isAuth, validate_input_user)
router.route('/count_patients')
    .get(isAuth, count_patients)
router.route('/:id')
    .delete(isAuth, delete_user)
    .put(isAuth, update_user)
router.route('/admit/:id')
    .put(isAuth, admit_patient)


export default router 