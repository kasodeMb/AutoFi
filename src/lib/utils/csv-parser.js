/**
 * Remove extra key/values from object for a given array
 * @exports
 * @param {object} row - Object representing column/value of CSV row
 * @param {array} allowedColumns - Allowed collumns/keys array
 * @returns {object}
 */
export const removeExtraColumns = (row, allowedColumns) => {
  return allowedColumns.reduce((obj, key) => ({ ...obj, [key]: row[key] }), {})
}
