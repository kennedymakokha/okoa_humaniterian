

import express from 'express'

import { isAuth } from './../midddlewares/auth.middleware.js'
import { create_course, delete_course, get_courses } from '../controllers/courses.controller.js'

const router = express.Router()

router.route('/')
    .get(isAuth, get_courses)
    .post(isAuth, create_course)
    router.route('/:id')
    .delete(isAuth, delete_course)
    // .put(protect, updateArea)
    // .get(protect, getArea)
export default router 