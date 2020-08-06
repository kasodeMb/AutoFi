import multer from 'multer'

/**
 * Filter mimetype to only allow csv files
 * @param {object} req
 * @param {object} file
 * @param {function} cb
 * @returns {fuction}
 */
const fileFilter = (req, file, cb) =>
  file.mimetype === 'text/csv' ? cb(null, true) : cb(null, false)

/**
 * Multer configuration
 * @exports
 */
export const upload = multer({
  dest: 'uploads/',
  fileFilter,
})
