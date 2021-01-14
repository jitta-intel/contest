const axios = require('axios')


const test = async (uri) => {
  // Make a request for a user with a given ID
  try {
    const result = await axios.get(uri, {
      timeout: 3000
    })
    if (result.status === 200) {
      return {
        pass: true
      }
    }
  } catch (error) {
    const { response } = error
    // console.error(error)
    return {
      pass: false,
      message: response ? response.status : error.message
    }
  }
}

module.exports = test
