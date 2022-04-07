import asyncHandler from 'express-async-handler'
import HumaData from '../models/humaData-model.js'

// @desc   Fetch all data 
// @route  GET /api/data
// @access Public
const getHumadata = asyncHandler( async (req,res) => {
    const data = await HumaData.find({})

    res.json([data])
})

// @desc   Add data
// @route  POST /api/data
// @access Public
const addData = asyncHandler( async (req,res) => {

    const testdata = req.body.uploadData
    try {
        for (const test2data of testdata){
            const data = await HumaData.create({
                device_id: test2data[0],
                time: test2data[1],
                hrValue: test2data[2],
                irValue: test2data[3],
                redlightValue: test2data[4],
                validValue: test2data[5],
                tempValue: test2data[6],
                humidityValue: test2data[7],
                xValue: test2data[8],
                yValue: test2data[9],
                zValue: test2data[10],
                user: test2data[11]
            })
        }
        res.status(201).json({})
        
    }catch{
        res.status(400)
        throw new Error('Invalid data')
    }

    


})


// @desc   Fetch all data 
// @route  GET /api/data/:dateFrom/:dateTo
// @access Public
const getDataByDate = asyncHandler( async (req,res) => {

    const data = await HumaData.find({
        time: {
        $gte: new Date("2019-09-26T04:58:30.996Z"),
        $lt: new Date("2022-05-01T00:00:00.000Z")
    }})

    



    res.json([data])
})

export {getHumadata, addData,getDataByDate}