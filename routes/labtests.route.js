

import express from 'express'

import { isAuth } from '../midddlewares/auth.middleware.js'
import { delete_tests, update_tests } from '../controllers/test.controller.js'
import { create_Lab_tests,post_Lab_results, get_labTest_user, get_user_lab } from '../controllers/Labtest.controller.js'
const router = express.Router()
router.route('/')
    .post(isAuth, create_Lab_tests)
    router.route('/post-results')
    .put(isAuth, post_Lab_results)
router.route('/:id')
    .delete(isAuth, delete_tests)
    .put(isAuth, update_tests)
    .get(isAuth, get_labTest_user)
router.route('/lab/:id')
    .get(isAuth, get_user_lab)
export default router 