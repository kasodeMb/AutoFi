import mongoose from 'mongoose'

import { DEFAULT_CSV_LAYOUT } from '../../config/settings'

const { Schema } = mongoose
const schemaOpts = DEFAULT_CSV_LAYOUT
const VehicleModelSchema = new Schema(schemaOpts)

export const VehicleModel = mongoose.model('VehicleModel', VehicleModelSchema )
