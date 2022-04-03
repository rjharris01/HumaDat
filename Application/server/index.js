import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

import connectDB from './db/db.js'
import userRoutes from './routes/userRoutes.js'
import humaDataRouter from './routes/humaData-router.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())






app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', humaDataRouter)
app.use('/api/users', userRoutes)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
