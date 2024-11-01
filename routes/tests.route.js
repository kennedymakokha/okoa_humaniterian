

import express from 'express'

import { isAuth } from '../midddlewares/auth.middleware.js'
import { create_tests, upload_tests, get_fingerPrint, delete_tests, get_tests, update_tests } from '../controllers/test.controller.js'
import paginated from '../paginate/speciality.paginate.js'
import Tests from '../models/tests.model.js'
const router = express.Router()

router.route('/')
    .get([paginated(Tests)], isAuth, get_tests)
    .post(isAuth, create_tests)
router.route('/fingerPrint')
    .post(isAuth, get_fingerPrint)
router.route('/upload')
    .post(isAuth, upload_tests)
router.route('/:id')
    .delete(isAuth, delete_tests)
    .put(isAuth, update_tests)

export default router 