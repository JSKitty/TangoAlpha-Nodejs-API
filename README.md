# ConcordAPI
ConcordAPI is intended to be a simple way of interacting with the Concord Services and it's REST API via Node.js.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

**Notice:** This module is in early development, and may have minor bugs and inconveniences, this module is under active development by the Concord Team and Community


# Getting Started

Install the Concord-API NPM Package with:
```
npm i concordapi
```
And require the module in your Node.js application with:
```js
var concord = require("concordapi")
```

# Using the API

## Reading Concord Exchange (CXDx) Prices

To check a coin's price in CXD use:
```js
concord.price(string).then(price => {
  console.log(price) // Logs the price of 'string'
})
```

For example, using:
```js
var coin = "IC"

concord.price(coin).then(price => {
  console.log(coin + " is priced at " + price + " CXD") // Logs the price of 'IC'
})
```
Would log the price of IC (Ignition Coin) live from the Concord Exchange.

## Reading Concord Social Platform (CSP) Profiles

There are two options you can choose from, to read data from a user's profile.
### Method One - Via the user Object
The user Object contains all public data of a user's profile, the contents of the object can be seen by stringifying the result of the function:
```js
/* userID is the DiscordID of the user who's profile you're reading from, as a string */
concord.getUser(userID).then(user => {
  console.log("User's full data object: "+JSON.stringify(user))

	console.log("User's balance is "+user.balance)
	console.log("User's Discord Username is "+user.discordUsername)
	console.log("User's Discord ID is "+user.discordID)
})
```

### Method Two - Individual Profile elements
If you don't want to use the full object, or want to create a Lightweight function without accessing the object, you can use:
```js
concord.getBalance(userID).then(balance => {
  console.log("Balance of "+userID+" is " + balance + " CXD")
})
```

## Sending a Transaction through ConcordPay
ConcordPay is a simple online interface for the Lightnet transaction system, transactions can be sent directly to any registered Lightnet User from any integrated Platform.

To send a transaction, you first need to provide your Concord Home account credentials in an Object, as shown below:
```js
var auth = {u: 'username-here', p: 'password-here'} /* Replace values with your real credentials! */
```

Once you've entered your Auth-data, send your transaction!

```js
var amount = 25 /* The amount of Concord (CXD) you are sending */
var to = 'username-of-transaction-receiver' /* This is the user Receiving the transaction */

concord.send(auth, amount, to).then(response => { /* Sends your Auth and Transaction data to Lightnet for processing */
  console.log(response) /* Logs the API's response to the console. E.G: "(User)'s Payment Has Sent!'" */
})

```

And to Receive transactions, simply give your Concord Home username to the application/user that wants to pay you

## Full Examples
  Examples in this section can be freely copy/pasted into your code and modified to your choosing, and when unmodified and authenticated, "just work"

### Example 1. Continuously pulling a Concord Exchange coin price
  ```js
	/* This script would run indefinitely until the console/terminal is closed manually */
  var concord = require("concordapi")

  var coin = "IC" // A Coin listed on the CXDx to check the price of, in CXD.
  setInterval(checkPrice, 5000) // Check coin price every 5 seconds

  function checkPrice () {
		concord.price(coin).then(price => {
  		console.log('1 '+coin+' is '+price+' CXD') // Prints the price of the CXDx Coin
		})
  }
```

### Example 2. Authenticating and sending a Transaction
  ```js
  var auth = {u: 'username-here', p: 'password-here'}
  var amount = 25  /* The amount of Concord (CXD) you are sending */
  var to = 'username-of-receiver'  /* This is the user Receiving the transaction */

  concord.send(auth, amount, to).then(response => { /* The API Package function, to send the payment to the Lightnet Server */
    console.log(response)  /* Logs the API's response to the console. E.G: "(User)'s Payment Has Sent!'" */
  })
  ```
