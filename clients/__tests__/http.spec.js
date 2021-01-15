const http = require('http')

const testHttp = require("../http")

// TODO: create db for test?

describe('Http', () => {
  const requestListener = function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    if (req.url === '/') {
      res.writeHead(200)
      return res.end('Hello world')
    } else if (req.url === '/timeout') {
      res.writeHead(200)
      return setTimeout(() => {
        return res.end('')
      }, 10000)
    } else {
      res.writeHead(404)
      return res.end('not found')
    }
  }
  const server = http.createServer(requestListener)

  beforeAll(() => {
    server.listen(3333)
  })

  afterAll((callback) => {
    server.close(callback)
  })

  const uri = 'http://localhost:3333'
  test('should report pass connection', async () => {
    const result = await testHttp(uri)
    expect(result).toEqual({
      pass: true
    })
  })

  test('should report fail connection on https', async () => {
    const result = await testHttp('https://localhost:3333')
    expect(result).toEqual({
      pass: false,
      message: 'Network Error',
    })
  })

  test('should report failed connection', async () => {
    const result = await testHttp(`${uri}/notfound`)
    expect(result).toEqual({
      pass: false,
      message: 404
    })
  })

  test('should report failed when response timeout', async () => {
    const result = await testHttp(`${uri}/timeout`)
    expect(result).toEqual({
      pass: false,
      message: 'timeout of 3000ms exceeded'
    })
  })
})
