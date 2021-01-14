const testMongo = require("../mongo")

// TODO: create db for test?

describe('Mongo', () => {
  const uri = 'mongodb://localhost:27017'
  test('should report pass connection', async () => {
    const result = await testMongo(uri)
    expect(result).toEqual({
      pass: true
    })
  })

  test('should report failed connection when uri is not available', async () => {
    const result = await testMongo('mongodb://localhost:27018')
    expect(result).toEqual({
      pass: false,
      message: 'MongoNetworkError',
      stacktrace: `failed to connect to server [localhost:27018] on first connect [MongoNetworkError: connect ECONNREFUSED 127.0.0.1:27018
    at connectionFailureError (/Users/note/Codes/GitHub/contester/node_modules/mongodb/lib/core/connection/connect.js:340:14)
    at Socket.<anonymous> (/Users/note/Codes/GitHub/contester/node_modules/mongodb/lib/core/connection/connect.js:310:16)
    at Object.onceWrapper (events.js:417:26)
    at Socket.emit (events.js:310:20)
    at emitErrorNT (internal/streams/destroy.js:92:8)
    at emitErrorAndCloseNT (internal/streams/destroy.js:60:3)
    at processTicksAndRejections (internal/process/task_queues.js:84:21) {
  errno: 'ECONNREFUSED',
  code: 'ECONNREFUSED',
  syscall: 'connect',
  address: '127.0.0.1',
  port: 27018,
  name: 'MongoNetworkError'
}]`
    })
  })
})
