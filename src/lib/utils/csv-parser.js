export const removeExtraColumns = (row, allowedColumns) => {
  return allowedColumns.reduce((obj, key) => ({ ...obj, [key]: row[key] }), {})
}
