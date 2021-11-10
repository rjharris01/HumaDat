const express = require('express')

const DataCtrl = require('../controllers/humaData-ctrl')

const router = express.Router()

router.post('/humaData', DataCtrl.addData)
router.put('/humaData/:id', DataCtrl.updateData)
router.delete('/humaData/:id', DataCtrl.deleteData)
router.get('/humaData/:id', DataCtrl.getDataById)
router.get('/humaData', DataCtrl.getData)