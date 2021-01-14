const Url = require('url-parse')
const Promise = require('bluebird')
const clients = require('./clients')


class Contester {
  /* conlist[] = [{
    name:
    uri:
    note
  }] */
  constructor(conlist) {
    this.conlist = conlist || []
  }


  static async test (url) {
    const urlObject = new Url(url)
    const protocol = urlObject.protocol.replace(':', '')
    if (clients[protocol]) {
      const result = await clients[protocol](url)
      return result
    }
  }


  async run() {
    const result = Promise.map(this.conlist, async ({ name, uri, note }) =>{
      const result = await Contester.test(uri)
      console.log({ name, uri, result })
      return {
        name,
        uri,
        note,
        result
      }
    })

    return false
  }
}

module.exports = Contester