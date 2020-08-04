import express from 'express'
import multer from 'multer'

import { AddVehiclePostHandler } from './add'

const route = express.Router()
const fileFilter = (req, file, cb) =>
  file.mimetype === 'text/csv' ? cb(null, true) : cb(null, false)
const processRequest = async (req, res) => {
  const response = await AddVehiclePostHandler({
    file: req?.file,
    provider: req.body?.provider,
  })

  return res.status(response.code).json({ message: response.message })
}
const upload = multer({
  dest: 'uploads/',
  fileFilter,
})

route.post('/', upload.single('file'), processRequest)

export default route
