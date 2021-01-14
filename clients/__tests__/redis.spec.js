const testRedis = require("../redis")


describe('Redis', () => {
  test('should report pass connection', async () => {
    const result = await testRedis('redis://localhost:6379')
    expect(result).toEqual({
      pass: true
    })
  })

  test('should report pass connection', async () => {
    const result = await testRedis('redis://localhost:6379/1')
    expect(result).toEqual({
      pass: true
    })
  })

  test('should report failed connection', async () => {
    const result = await testRedis('redis://localhost:6377')
    expect(result).toEqual({
      pass: false,
      message: "Reached the max retries per request limit (which is 1). Refer to \"maxRetriesPerRequest\" option for details."
    })
  })
})
