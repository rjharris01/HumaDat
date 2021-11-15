import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './db/db.js'

import humaDataRouter from './routes/humaData-router.js'

dotenv.config()

connectDB()

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())






app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', humaDataRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
