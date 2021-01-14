const clients = require('../clients')
const Contest = require('../index')



describe('Contest', () => {
  describe('test', () => {
    beforeAll(() => {
      jest.spyOn(clients, 'mongodb')
      jest.spyOn(clients, 'redis')
      jest.spyOn(clients, 'http')
      jest.spyOn(clients, 'mysql')
    })
    afterAll(() => {
      clients.mongodb.mockRestore()
      clients.redis.mockRestore()
      clients.http.mockRestore()
      clients.mysql.mockRestore()
    })
    it('should call mongodb for mongodb protocol', async () => {
      const url = 'mongodb://localhost:27017'
      const result = await Contest.test(url)
      expect(clients.mongodb).toHaveBeenCalled()
      expect(result.pass).toEqual(true)
    })

    it('should call mysql for mysql protocol', async () => {
      const url = 'mysql://localhost:3306/db'
      const result = await Contest.test(url)
      expect(clients.mysql).toHaveBeenCalled()
      expect(result.pass).toEqual(false)
    })

    it('should call http for http protocol', async () => {
      const url = 'http://localhost:3000'
      const result = await Contest.test(url)
      expect(clients.http).toHaveBeenCalled()
      expect(result.pass).toEqual(false)
    })

    it('should call redis for redis protocol', async () => {
      const url = 'redis://localhost:6376'
      const result = await Contest.test(url)
      expect(clients.mongodb).toHaveBeenCalled()
      expect(result.pass).toEqual(false)
    })
  })
})