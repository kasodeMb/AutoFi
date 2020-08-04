/* eslint-disable no-console */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

export const Mongoose = () => {
  return new Promise((resolve) => {
    const mongoServer = new MongoMemoryServer({
      instance: {
        dbName: 'AutoFi-Dev',
      },
    })
  
    // const mongoUri = 'mongodb://127.0.0.1:55832/AutoFi-Dev?'
    mongoose.Promise = Promise
    mongoServer.getUri().then((mongoUri) => {
      const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
  
      mongoose.connect(mongoUri, mongooseOpts)
  
      mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(e)
          mongoose.connect(mongoUri, mongooseOpts)
        }
        console.log(e)
      })
  
      mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`)
        resolve()
      })
    })
  })
  
}
