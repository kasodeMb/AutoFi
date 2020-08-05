/* eslint-disable no-console */
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import { MONGO_DB_URI } from '../config/settings'

export const Mongoose = () => {
  return new Promise((resolve) => {
    const connect = (mongoUri) => {
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
    }

    if (!MONGO_DB_URI) {
      const mongoServer = new MongoMemoryServer({
        instance: {
          dbName: 'AutoFi-Dev',
        },
      })
   
      mongoose.Promise = Promise
      mongoServer.getUri().then((mongoUri) => {
        connect(mongoUri) 
      })
    } else {
      connect(MONGO_DB_URI) 
    }
    
  })
  
}
