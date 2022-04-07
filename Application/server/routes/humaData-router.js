import express from 'express'

import {getHumadata, addData, getDataByDate} from '../controllers/humaData-ctrl.js'

const router = express.Router()

router.post('/data', addData)
router.get('/data', getHumadata)
router.route('/data/:dateFrom/:dateTo').get(getDataByDate)

export default router