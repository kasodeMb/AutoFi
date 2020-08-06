import mongoose from 'mongoose'

import { VehicleModel } from '../../../src/lib/db/models/vehicles'
import { server } from '../../setup'

describe('Vehicles Service Fail Scenarios', () => {
  test('Should fail when CSV file is missing', async () => {
    // Call
    const resp = await server.post('/vehicles')

    // Asserts
    expect(resp.text).toBe('{"message":"Missing CSV File"}')
    expect(resp.status).toBe(400)
  })

  test('Should fail when provider is missing', async () => {
    // Call
    const resp = await server
      .post('/vehicles')
      .attach('file', 'tests/mocks/providerA.csv')

    // Asserts
    expect(resp.text).toBe('{"message":"Missing Provider Name"}')
    expect(resp.status).toBe(400)
  })

  test('Should fail when provider is invalid', async () => {
    // Call
    const resp = await server
      .post('/vehicles')
      .attach('file', 'tests/mocks/providerA.csv')
      .field('provider', 'test')

    // Asserts
    expect(resp.text).toBe('{"message":"Invalid Provider Name"}')
    expect(resp.status).toBe(400)
  })

  test('Should fail if colums are of an invalid type', async () => {
    // Mocks
    const spyInsertMany = jest
      .spyOn(VehicleModel, 'insertMany')
      .mockRejectedValue(new mongoose.Error.ValidationError())
    spyInsertMany.mockClear()

    // Call
    const resp = await server
      .post('/vehicles')
      .attach('file', 'tests/mocks/providerC.csv')
      .field('provider', 'providerC')

    // Asserts
    expect(resp.text).toBe(
      '{"message":"Validation Error In Provided CSV File."}'
    )
    expect(resp.status).toBe(400)
    expect(spyInsertMany).toHaveBeenCalledTimes(1)
  })

  test('Should fail if an unexpected error happens while saving into the db', async () => {
    // Mocks
    const spyInsertMany = jest
      .spyOn(VehicleModel, 'insertMany')
      .mockRejectedValue(new Error('test'))
    spyInsertMany.mockClear()

    // Call
    const resp = await server
      .post('/vehicles')
      .attach('file', 'tests/mocks/providerC.csv')
      .field('provider', 'providerC')

    // Asserts
    expect(resp.text).toBe('{"message":"Unexpected Error"}')
    expect(resp.status).toBe(500)
    expect(spyInsertMany).toHaveBeenCalledTimes(1)
  })
})

describe('Vehicles Service Success Scenarios', () => {
  test('Should succeed when with valid options', async () => {
    // Mocks
    const spyInsertMany = jest
      .spyOn(VehicleModel, 'insertMany')
      .mockResolvedValue([{}, {}])
    spyInsertMany.mockClear()

    // Call
    const resp = await server
      .post('/vehicles')
      .attach('file', 'tests/mocks/providerA.csv')
      .field('provider', 'providerA')

    // Asserts
    expect(resp.text).toBe('{"message":"2 vehicles were successfuly saved."}')
    expect(resp.status).toBe(200)
    expect(spyInsertMany).toHaveBeenCalledTimes(1)
  })

  test('Should succeed with a valid provider that send less columns', async () => {
    const insertManyData = [
      {
        create_date: 'Mon Aug 03 2020 17:57:36 GMT-0600',
        make: undefined,
        mileage: '10000',
        model: 'ESs',
        price: '30000',
        update_date: 'Mon Aug 03 2020 17:57:36 GMT-0600 ',
        uuid: '324234234',
        vin: 'sdf32434sdf3',
        year: '2020',
        zip_code: undefined,
      },
      {
        create_date: 'Mon Aug 03 2020 17:57:36 GMT-0600',
        make: undefined,
        mileage: '10000',
        model: 'Ciaz',
        price: '30000',
        update_date: 'Mon Aug 03 2020 17:57:36 GMT-0600 ',
        uuid: '123456789',
        vin: 'sdf32434sdf3',
        year: '2018',
        zip_code: undefined,
      },
    ]

    // Mocks
    const spyInsertMany = jest
      .spyOn(VehicleModel, 'insertMany')
      .mockResolvedValue(insertManyData)
    spyInsertMany.mockClear()

    // Call
    const resp = await server
      .post('/vehicles')
      .attach('file', 'tests/mocks/providerB.csv')
      .field('provider', 'providerB')

    // Asserts
    expect(resp.text).toBe('{"message":"2 vehicles were successfuly saved."}')
    expect(resp.status).toBe(200)
    expect(spyInsertMany).toHaveBeenCalledTimes(1)
    expect(spyInsertMany).toHaveBeenCalledWith(insertManyData)
  })

  test('Should succeed with a valid provider that send extra columns', async () => {
    const insertManyData = [
      {
        create_date: undefined,
        make: undefined,
        mileage: '10000',
        model: undefined,
        price: '30000',
        update_date: undefined,
        uuid: '324234234',
        vin: 'sdf32434sdf3',
        year: '2020',
        zip_code: '10201',
      },
      {
        create_date: undefined,
        make: undefined,
        mileage: '10000',
        model: undefined,
        price: '30000',
        update_date: undefined,
        uuid: '123456789',
        vin: 'sdf32434sdf3',
        year: '2018',
        zip_code: '10201',
      },
    ]

    // Mocks
    const spyInsertMany = jest
      .spyOn(VehicleModel, 'insertMany')
      .mockResolvedValue(insertManyData)
    spyInsertMany.mockClear()

    // Call
    const resp = await server
      .post('/vehicles')
      .attach('file', 'tests/mocks/providerC.csv')
      .field('provider', 'providerC')

    // Asserts
    expect(resp.text).toBe('{"message":"2 vehicles were successfuly saved."}')
    expect(resp.status).toBe(200)
    expect(spyInsertMany).toHaveBeenCalledTimes(1)
    expect(spyInsertMany).toHaveBeenCalledWith(insertManyData)
  })
})
