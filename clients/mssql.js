const { debug } = require('console')
const mssql = require('mssql')
const Url = require('url-parse')


const test = async (uri) => {
  let message
  let pass = false
  

  const urlObject = new Url(uri)
  // console.log(urlObject)

  const config = {
    user: urlObject.username,
    password: urlObject.password,
    server: urlObject.hostname,
    database: urlObject.pathname.replace('/', ''),
    connectionTimeout: 1500
  }
  // console.log('connecting to uri',config)
  try {
    const pool = await mssql.connect(config)
    if (pool._connected) {
      pass = true
      await pool.close()
    }

  } catch (error) {
    console.error(error)
    message = error.message
  }

  return {
    pass,
    message
  }
}

module.exports = test
