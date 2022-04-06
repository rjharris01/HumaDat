import express from 'express'

import {getHumadata, addData} from '../controllers/humaData-ctrl.js'

const router = express.Router()

router.post('/data', addData)
router.get('/data', getHumadata)

export default router