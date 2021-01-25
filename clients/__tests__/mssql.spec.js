const mssql = require('mssql')
const testMssql = require("../mssql")

describe('Mysql', () => {
  beforeAll(() => {
    jest.spyOn(mssql, 'connect')
  })
  afterAll(() => {
    mssql.mockRestore()
  })
  test('should report pass connection', async () => {
    mssql.connect.mockImplementationOnce(() => {
      return {
        _connected: true,
        close: () => {}
      }
    })
    const result = await testMssql('')
    expect(result).toEqual({
      pass: true
    })
  })

  test('should report failed connection', async () => {
    const result = await testMssql('mssql://192.168.110.111:1433/testdb')
    expect(result).toEqual({
      pass: false,
      message: 'Failed to connect to 192.168.110.111:1433 in 1500ms'
    })
  })
})
