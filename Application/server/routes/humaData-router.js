import express from 'express'

import {getHumadata, addData, getDataByDate, getDevices} from '../controllers/humaData-ctrl.js'

const router = express.Router()

router.post('/data', addData)
router.get('/data', getHumadata)
router.get('/data/device/:id', getDevices)
router.route('/data/:dateFrom/:dateTo/:device_id').get(getDataByDate)

export default router