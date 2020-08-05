import dotenv from 'dotenv'

dotenv.config()

export const { MONGO_DB_URI } = process.env

// eslint-disable-next-line global-require
export const CSV_LAYOUTS = require('../../../provider_layouts.json')

export const DEFAULT_CSV_LAYOUT = {
  uuid: String,
  vin: String,
  make: String,
  model: String,
  mileage: Number,
  year: Number,
  price: Number,
  zip_code: Number,
  create_date: Date,
  update_date: Date,
} 
