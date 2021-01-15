const axios = require('axios')


const test = async (uri) => {
  // Make a request for a user with a given ID
  try {
    const result = await axios.get(uri, {
      timeout: 3000,
      headers: {
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      }
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
