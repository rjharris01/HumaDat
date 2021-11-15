import express from 'express'

import DataCtrl from '../controllers/humaData-ctrl.js'
import HumaData from '../models/humaData-model.js'

const router = express.Router()

router.post('/humaData', DataCtrl.addData)
router.put('/humaData/:id', DataCtrl.updateData)
router.delete('/humaData/:id', DataCtrl.deleteData)
router.get('/humaData/:id', DataCtrl.getDataById)
router.get('/humaData', DataCtrl.getData)

export default router