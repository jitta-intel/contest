const testMysql = require("../mysql")

// TODO: create db for test?

describe('Mysql', () => {
  test('should report pass connection', async () => {
    const result = await testMysql('mysql://root:12345678@localhost:3306/sandbox_backtest')
    expect(result).toEqual({
      pass: true
    })
  })

  test('should report failed connection', async () => {
    const result = await testMysql('mysql://root:1234678@localhost:3306/sandbox_backtest')
    expect(result).toEqual({
      pass: false,
      message: 'ER_ACCESS_DENIED_ERROR'
    })
  })

  test('should report failed connection', async () => {
    const result = await testMysql('mysql://localhost:3307/sandbox_backtest')
    expect(result).toEqual({
      pass: false,
      message: 'ECONNREFUSED'
    })
  })
})
