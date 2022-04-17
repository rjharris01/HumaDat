import express from 'express'

import {getHumadata, addData, getDataByDate, getInfo, deleteDataByDate} from '../controllers/humaData-ctrl.js'

const router = express.Router()

router.post('/data', addData)
router.get('/data', getHumadata)
router.get('/data/info/:id', getInfo)
router.route('/data/:dateFrom/:dateTo/:device_id').get(getDataByDate).delete(deleteDataByDate)

export default router