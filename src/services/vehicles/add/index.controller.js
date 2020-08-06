import csv from 'csv-parser'
import fs from 'fs'
import mongoose from 'mongoose'

import { CSV_LAYOUTS, DEFAULT_CSV_LAYOUT } from '../../../lib/config/settings'
import {
  ERROR_CSV_FILE_VALIDATION,
  ERROR_INVALID_PROVIDER_NAME,
  ERROR_MISSING_FILE,
  ERROR_MISSING_PROVIDER_NAME,
} from '../../../lib/constants/errors'
import { VehicleModel } from '../../../lib/db/models/vehicles'
import { removeExtraColumns } from '../../../lib/utils/csv-parser'
import { BadRequestError, ServerError } from '../../../lib/utils/custom-errors'

/**
 * Validates the file and provider exist
 * @param {object} file - File information Object
 * @param {string} provider - The provider name
 * @throws {BadRequestError}
 */
const validate = ({ file, provider }) => {
  if (!file) {
    throw new BadRequestError(ERROR_MISSING_FILE)
  } else if (!provider) {
    throw new BadRequestError(ERROR_MISSING_PROVIDER_NAME)
  } else if (!CSV_LAYOUTS[provider]) {
    throw new BadRequestError(ERROR_INVALID_PROVIDER_NAME)
  }
}

/**
 * Process CSV content and save it into the data base
 * @param {object} file - File information Object
 * @param {string} provider - The provider name
 * @throws {BadRequestError}
 * @throws {ServerError}
 */
const processCSV = (file, provider) => {
  const { path } = file

  return new Promise((resolve, reject) => {
    const records = []
    const columnLayout = CSV_LAYOUTS[provider]
    fs.createReadStream(path)
      .pipe(csv(columnLayout))
      .on('data', (row) => {
        records.push(removeExtraColumns(row, Object.keys(DEFAULT_CSV_LAYOUT)))
      })
      .on('end', () => {
        VehicleModel.insertMany(records)
          .then((documents) => {
            resolve(`${documents.length} vehicles were successfuly saved.`)
          })
          .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
              reject(new BadRequestError(ERROR_CSV_FILE_VALIDATION))
            } else {
              reject(new ServerError('Unexpected Error'))
            }
          })
      })
  })
}

/**
 * Validates and process CSV file
 * @export
 * @param {object} file - File information Object
 * @param {string} provider - The provider name
 * @returns {object} Message and status code result
 */
export const handleAddVehicle = async ({ file, provider }) => {
  try {
    validate({ file, provider })
    const result = await processCSV(file, provider)

    return {
      message: result,
      code: 200,
    }
  } catch (err) {
    return {
      message: err.message,
      code: err.statusCode,
    }
  }
}
