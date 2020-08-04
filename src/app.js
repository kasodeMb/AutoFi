import cookieParser from 'cookie-parser'
import express from 'express'
import logger from 'morgan'

import vehiclesRouter from './services/vehicles'

const app = express()
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/vehicles', vehiclesRouter)


export default app
