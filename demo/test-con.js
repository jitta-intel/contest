const Contest = require('../index')


const contest = new Contest([
  {
    name: 'mysql',
    uri: 'mysql://root:1234678@localhost:3306/mysqldb'
  },
  {
    name: 'google',
    uri: 'http://google.co.th'
  },
  {
    name: 'redis',
    uri: 'redis://localhost:6376/2'
  },
  {
    name: 'mongo',
    uri: 'mongodb://localhost:27917/mongodb'
  }
])

contest.run()