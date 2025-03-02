

import express from 'express'

import { isAuth } from '../midddlewares/auth.middleware.js'
import { get_areas,  create_areas, update_areas, delete_areas } from '../controllers/areas.controller.js'
import paginated from '../paginate/areas.paginate.js'
import Area from '../models/areas.model.js'
const router = express.Router()

router.route('/')
    .get([paginated(Area)], isAuth, get_areas)
    .post(isAuth, create_areas)

router.route('/:id')
    .delete(isAuth, delete_areas)
    .put(isAuth, update_areas)

export default router 