

import express from 'express'

import { isAuth } from '../midddlewares/auth.middleware.js'
import { get_finances, get_user_finance, update_user_finance } from '../controllers/finance.controller.js'
import paginated from '../paginate/finance.paginate.js'
import Finance from './../models/finance.model.js'
import Fee from './../models/fee.model.js'
const router = express.Router()

router.route('/')
   
    .get([paginated(Fee)], isAuth, get_finances)
    router.route('/:id')
    .put(isAuth, update_user_finance)
    // .get(isAuth, get_user_finance)
    .get([paginated(Finance)], isAuth, get_user_finance)
export default router 
