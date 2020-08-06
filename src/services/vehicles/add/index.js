import { handleAddVehicle } from './index.controller'

/**
 * Hanle add new vehicle request
 * @export
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {object} HTTP response
 */
export const AddVehiclePostHandler = async (req, res) => {
  const response = await handleAddVehicle({
    file: req?.file,
    provider: req.body?.provider,
  })

  return res.status(response.code).json({ message: response.message })
}
