import express from 'express'

import { upload } from '../../lib/config/multer'

import { AddVehiclePostHandler } from './add'

const route = express.Router()

route.post('/', upload.single('file'), AddVehiclePostHandler)

export default route
