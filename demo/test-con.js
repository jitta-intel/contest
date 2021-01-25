const Contester = require('../index')


const contester = new Contester([
  {
    name: 'mysql',
    uri: 'mysql://root:1234678@localhost:3306/mysqldb'
  },
  {
    name: 'google',
    uri: 'http://google.co.th'
  },
  {
    name: 'google',
    uri: 'https://google.co.th'
  },
  {
    name: 'redis',
    uri: 'redis://localhost:6376/2'
  },
  {
    name: 'mongo',
    uri: 'mongodb://localhost:27917/mongodb'
  },
  {
    name: 'mssql',
    uri: 'mssql://localhost:1433/mssql'
  }
])

contester.run()