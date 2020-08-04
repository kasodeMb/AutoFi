const { MongoMemoryServer } = require('mongodb-memory-server');

(async function test(){
    const mongoServer = new MongoMemoryServer({
        instance: {
            dbName: 'AutoFi-Dev'
        }
    })
    
    const uri = await mongoServer.getUri()
    console.log(uri)
})()

