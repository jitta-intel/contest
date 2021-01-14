
const { debug } = require('console')
const Redis = require('ioredis')


const test = async (uri) => {
  let pass = false
  let message
  debug('testing ', uri)
  let client
  try {
    client = new Redis(uri, { maxRetriesPerRequest: 1 })

    const setResult = await client.set("xxx_foo", "bar")
    if (setResult === 'OK') {
      const getResult = await client.get("xxx_foo")
      if (getResult === 'bar') {
        pass = true
      }
    }
  } catch (error) {
    message = error.message
    // console.error(error)
  }
  if (client) {
    await client.disconnect()
  }
  
  return {
    pass,
    message
  }

}

module.exports = test
