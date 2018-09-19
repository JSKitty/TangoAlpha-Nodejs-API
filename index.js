const req = require('requestify')
const basePublicUrl = 'https://www.cxd.network/api/public/v1/'
const basePrivateUrl = 'https://www.cxd.network/api/private/v1/'
var lastPrice = 0,
  lastCoin = '',
  user = {discordID: '', discordUsername: '', balance: 0}

exports.price = async function (coin) {
  if (coin && coin != null && typeof coin === 'string' && coin.length >= 2) {
    try {
      var price = await req.get(basePublicUrl + 'getprice?coin=' + coin.toLowerCase())
      price = Number(price.body)
      if (price <= 0 || price === NaN || price === null || price === undefined) {
        throw 'Price returned for ' + coin + ' is not a number, you may have entered an incorrect ticker'
      }
      lastPrice = price
      lastCoin = coin
      return price
    } catch (err) {
      if (err.body) {
        console.warn('ConcordAPI Error caught: (' + err.body + ')')
      } else {
        console.warn('ConcordAPI Error caught: (' + err + ')')
      }
      if (lastCoin === coin) {
        return lastPrice
      } else {
        return 0
      }
    }
  } else {
    console.warn('String variable missing, "' + typeof coin + ' - ' + coin + '" was recieved')
  }
}

exports.getBalance = async function (discordID) {
  if (discordID && discordID != null && typeof discordID === 'string' && discordID.length === 18) {
    try {
      var balance = await req.get(basePublicUrl + 'getprofile?id=' + discordID)
      balance = Number((Number(JSON.parse(balance.body).balance) - 0.00000001).toFixed(8))
      return balance
    } catch (err) {
      if (err.body) {
        console.warn('ConcordAPI Error caught: (' + err.body + ')')
      } else {
        console.warn('ConcordAPI Error caught: (' + err + ')')
      }
    }
  } else if (typeof discordID !== 'string') {
    console.warn('String variable missing, "' + typeof discordID + ' - ' + discordID + '" was recieved')
  } else {
    console.warn('Invalid parameters, please ensure discordID is 18 characters long and is the correct format: string')
  }
}

exports.send = async function (auth, amount, to) {
  if (auth && auth != null && amount && amount != null && to && to != null && typeof auth === 'object' && auth.u && auth.p) {
    try {
      if (amount >= 0.0001) {
        if (to.length >= 2) {
          var response = await req.post(basePrivateUrl + 'send', {auth: auth, amount: amount, to: to})
          return response.body
        } else {
          console.warn('Invalid Parameter, "To" is not a string with a length of atleast 2')
        }
      } else {
        console.warn('Invalid Parameter, "Amount" is not a Number over atleast 0.0001')
      }
    } catch (err) {
      if (err.body) {
        if (err.body.includes('Insufficient') === false) {
          console.warn('ConcordAPI Error caught: (' + err.body + ')')
        } else {
          return 'Insufficient Funds!'
        }
      } else {
        if (err) { console.warn('ConcordAPI Error caught: (' + err + ')') }
      }
    }
  } else if (typeof auth !== 'object') {
    console.warn('Object variable missing, "' + typeof auth + ' - ' + auth + '" was recieved')
  } else {
    console.warn('Invalid Parameters, please ensure you have provided the following variables:\nObject: auth {String: p, String:u}\nNumber: amount\nString: to\nSee "GitHub - Concord-API-NodeJS - README.md" for more info')
  }
}

exports.getUser = async function (discordID) {
  if (discordID && discordID != null && typeof discordID === 'string' && discordID.length === 18) {
    try {
      var data = await req.get(basePublicUrl + 'getprofile?id=' + discordID)
      let userData = user
      userData.balance = Number((Number(JSON.parse(data.body).balance) - 0.00000001).toFixed(8))
      userData.discordID = discordID
      userData.discordUsername = JSON.parse(data.body).username
      return userData
    } catch (err) {
      if (err.body) {
        console.warn('ConcordAPI Error caught: (' + err.body + ')')
      } else {
        console.warn('ConcordAPI Error caught: (' + err + ')')
      }
    }
  } else if (typeof discordID !== 'string') {
    console.warn('String variable missing, "' + typeof discordID + ' - ' + discordID + '" was recieved')
  } else {
    console.warn('Invalid parameters, please ensure discordID is 18 characters long and is the correct format: string')
  }
}
