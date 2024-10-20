

import express from 'express'

import { isAuth } from '../midddlewares/auth.middleware.js'
import { get_Practical, delete_prac, create_Practical} from '../controllers/practicals.controller.js'

const router = express.Router()

router.route('/')
    .get(isAuth, get_Practical)
    .post(isAuth, create_Practical)
    router.route('/:id')
    .delete(isAuth, delete_prac)
    // .put(protect, updateArea)
    // .get(protect, getArea)
export default router 