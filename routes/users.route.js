

import express from 'express'
import { isAuth } from './../midddlewares/auth.middleware.js'
import {  create_user, delete_user, Enroll_user, get_users, login_user, update_user } from '../controllers/user.controller.js'
import User from './../models/auth.model.js'
import paginated from '../paginate/users.paginate.js'
const router = express.Router()

router.route('/')
    .get([paginated(User)], isAuth, get_users)
    .post(isAuth, create_user)

router.route('/:id')
    .delete(isAuth, delete_user)
    .put(isAuth, update_user)
router.route('/enroll/:id')
    .put(isAuth, Enroll_user)

router.route('/login').post(login_user)
export default router 