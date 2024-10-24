

import express from 'express'

import { isAuth } from './../midddlewares/auth.middleware.js'
import { create_course, delete_course, get_courses, update_Course } from '../controllers/courses.controller.js'

const router = express.Router()

router.route('/')
    .get(isAuth, get_courses)
    .post(isAuth, create_course)
    router.route('/:id')
    .delete(isAuth, delete_course)
    .put(isAuth, update_Course)
    // .get(protect, getArea)
export default router 