import asyncHandler from 'express-async-handler'
import HumaData from '../models/humaData-model.js'

const addData = asyncHandler ( async  (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide data',
        })
    }

    const humaData = new HumaData(body)

    if (!humaData) {
        return res.status(400).json({ success: false, error: err })
    }

    humaData
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: humaData._id,
                message: 'data added!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'data not added!',
            })
        })
})

const updateData = asyncHandler( async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    HumaData.findOne({ _id: req.params.id }, (err, humaData) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Data not found!',
            })
        }
        humaData.name = body.name
        humaData.time = body.time
        humaData.rating = body.rating
        humaData
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: humaData._id,
                    message: 'data updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'data not updated!',
                })
            })
    })
})

const deleteData = asyncHandler( async (req, res) => {
    await HumaData.findOneAndDelete({ _id: req.params.id }, (err, humaData) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!humaData) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }

        return res.status(200).json({ success: true, data: humaData })
    }).catch(err => console.log(err))
})


const getDataById = asyncHandler (async (req, res) => {
    await HumaData.findOne({ _id: req.params.id }, (err, humaData) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!data) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: humaData })
    }).catch(err => console.log(err))
})

const getData = asyncHandler( async (req, res) => {
    await HumaData.find({}, (err, humaData) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!humaData.length) {
            return res
                .status(404)
                .json({ success: false, error: `Data not found` })
        }
        return res.status(200).json({ success: true, data: humaData })
    }).catch(err => console.log(err))
})



export default { addData,updateData, deleteData, getData, getDataById}