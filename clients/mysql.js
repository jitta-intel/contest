const { debug } = require('console')
const mysql = require('mysql')

const test = async (uri) => {
  let message
  const mysqlConnection = mysql.createConnection(uri)

  // TODO: add returnMessage  to output
  const pass = await new Promise((resolve, reject) => {
    return mysqlConnection.connect((error) => {
      if (error) {
        message = error.code
        // console.error('error connecting: ' + error.stack)
        return resolve(false)
      }
      return resolve(true)
    })
  })
  if (pass) {
    mysqlConnection.destroy()
  }
  return {
    pass,
    message
  }
}

module.exports = test
