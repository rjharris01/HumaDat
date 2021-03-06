import asyncHandler from 'express-async-handler'
import HumaData from '../models/humaData-model.js'

// @desc   Fetch all devices Ids 
// @route  GET /api/data/info/:id
// @access Public
const getInfo = asyncHandler( async (req,res) => {
    try {
    const data = await HumaData.find( { user: req.params.id }).distinct("device_id")
    const count = await HumaData.count( { user: req.params.id })
    const start = await HumaData.findOne({},{},{sort:{'time': 1}})
    const end = await HumaData.findOne({},{},{sort:{'time': -1}})
    res.json([data,[count],[start.time],[end.time]])
    }
    catch{
    res.status(400)
    throw new Error('Invalid data')
    }
})

// @desc   Fetch all data 
// @route  GET /api/data/
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
                sp02Value: test2data[3],
                irValue: test2data[4],
                redlightValue: test2data[5],
                validValue: test2data[6],
                tempValue: test2data[7],
                humidityValue: test2data[8],
                xValue: test2data[9],
                yValue: test2data[10],
                zValue: test2data[11],
                user: test2data[12]
            })
        }
        res.status(201).json({})
        
    }catch{
        res.status(400)
        console.log(req.body.uploadData);
        throw new Error('Invalid data')
    }

})


// @desc   Fetch data between dates based on device id
// @route  GET /api/data/:dateFrom/:dateTo/:device_id
// @access Public
const getDataByDate = asyncHandler( async (req,res) => {  
    try {
    const data = await HumaData.find({
        time: {
            $gte: new Date(req.params.dateFrom),
             $lt: new Date(req.params.dateTo)
        },
        device_id: new String( req.params.device_id) 
    })
    res.json(data)
    }catch{
        res.status(400)
        throw new Error('Error occured while fetching data')
    }
})

// @desc   Fetch data between dates based on device id
// @route  DELETE /api/data/:dateFrom/:dateTo/:device_id
// @access Public
const deleteDataByDate = asyncHandler( async (req,res) => {  
    try {
    const data = await HumaData.deleteMany({
        time: {
            $gte: new Date(req.params.dateFrom),
             $lt: new Date(req.params.dateTo)
        },
        device_id: new String( req.params.device_id) 
    })
    res.status(201).json({})
    }catch{
    res.status(400)
    console.log(req.body.uploadData);
    throw new Error('Error occured while deleting data')
}
})

export {getHumadata,addData,getDataByDate,getInfo,deleteDataByDate}