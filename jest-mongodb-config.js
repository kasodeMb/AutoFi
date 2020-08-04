module.exports = {
    mongodbMemoryServerOptions: {
      instance: {
        dbName: 'jest'
      },
      binary: {
        version: '4.0.14', // Version of MongoDB
        skipMD5: true
      },
      autoStart: false
    }
  }
