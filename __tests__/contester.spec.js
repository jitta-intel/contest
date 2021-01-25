const clients = require('../clients')
const Contester = require('../index')



describe('Contester', () => {
  describe('test', () => {
    beforeAll(() => {
      jest.spyOn(clients, 'mongodb')
      jest.spyOn(clients, 'redis')
      jest.spyOn(clients, 'http')
      jest.spyOn(clients, 'mysql')
      jest.spyOn(clients, 'mssql')
    })
    afterAll(() => {
      clients.mongodb.mockRestore()
      clients.redis.mockRestore()
      clients.http.mockRestore()
      clients.mysql.mockRestore()
      clients.mssql.mockRestore()
    })
    it('should call mongodb for mongodb protocol', async () => {
      const url = 'mongodb://localhost:27017'
      const result = await Contester.test(url)
      expect(clients.mongodb).toHaveBeenCalled()
      expect(result.pass).toEqual(true)
    })

    it('should call mysql for mysql protocol', async () => {
      const url = 'mysql://localhost:3306/db'
      const result = await Contester.test(url)
      expect(clients.mysql).toHaveBeenCalled()
      expect(result.pass).toEqual(false)
    })

    it('should call http for http protocol', async () => {
      const url = 'http://localhost:3000'
      const result = await Contester.test(url)
      expect(clients.http).toHaveBeenCalled()
      expect(result.pass).toEqual(false)
    })

    it('should call http for http protocol', async () => {
      const url = 'https://localhost:3000'
      const result = await Contester.test(url)
      expect(clients.http).toHaveBeenCalled()
      expect(result.pass).toEqual(false)
    })

    it('should call redis for redis protocol', async () => {
      const url = 'redis://localhost:6376'
      const result = await Contester.test(url)
      expect(clients.mongodb).toHaveBeenCalled()
      expect(result.pass).toEqual(false)
    })
    it('should call mssql for sql protocol', async () => {
      const url = 'mssql://localhost:1433'
      const result = await Contester.test(url)
      expect(clients.mssql).toHaveBeenCalled()
      expect(result.pass).toEqual(false)
    })
    it('should throw if protocol is nto support', async () => {
      const url = 'unknow://localhost:1433'
      await expect(Contester.test(url)).rejects
        .toThrow('Protocol:unknow is not supported.')
    })
  })
})