const MongoClient = require('mongodb').MongoClient
 

const test = async (uri) => {
  let pass = true
  let message
  let stacktrace
  // Use connect method to connect to the server
  try {
    const client = await MongoClient.connect(uri)
    await client.close()
  } catch (error) {
    pass = false
    message = error.name
    stacktrace = error.message
  }
    
  return {
    pass,
    message,
    stacktrace
  }
}

module.exports = test
