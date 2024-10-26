

import express from 'express'

import { isAuth } from '../midddlewares/auth.middleware.js'
import { get_finances,update_user_misc_payments, get_user_finance, update_user_finance } from '../controllers/finance.controller.js'
import paginated from '../paginate/finance.paginate.js'

import Finance from './../models/finance.model.js'
import Fee from './../models/fee.model.js'
const router = express.Router()

router.route('/')
    .get([paginated(Fee)], isAuth, get_finances)
    .get([paginated(Finance)], isAuth, get_user_finance)
router.route('/:id')
    .put(isAuth, update_user_finance)
router.route('/payment-history').get([paginated(Finance)], isAuth, get_user_finance)
router.route('/misc-payments/update')
// .get([paginated(Finance)], isAuth, get_user_finance)
.put(isAuth, update_user_misc_payments)
// .get([paginatedUser(Finance)], isAuth, get_user_finance)
export default router 
