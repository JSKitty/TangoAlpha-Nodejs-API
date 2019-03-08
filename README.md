# TangoAlpha Node.js API

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

**Notice:** This module and API is in early development and may change in the future.

[TangoAlpha Official Website](https://tangoalpha.gq/)

# Getting Started

Install the tangoalpha NPM Package with:
```
npm i tangoalpha
```
Also, require the module in your Node.js application with:
```js
var tango = require("tangoalpha")
```

# Using the API

## Blocktime

```js
tango.blocktime().then(result => { //Result is a float
  console.log(result) // Logs the average blocktime in seconds
})
```

## Estimated ROI

```js
tango.roi().then(result => { //Result is a float
  console.log(result) // Logs the estimated yearly ROI in Percentage
})
```

## Blockdrift

```js
tango.blockdrift().then(result => { // Result is an Array
  console.log(JSON.stringify(result)) // Logs the 'drift' of the past 1000 blocks
})
```

## Getdb - (Warning! Very resource intensive, please do not spam this!)

```js
tango.getdb().then(result => { // Result is an Array
  console.log(JSON.stringify(result)) // Logs the entire DB of TangoAlpha
})
```

## mnstcount

```js
tango.mnstcount().then(result => { // Result is an Object
  console.log(JSON.stringify(result)) // Logs the blocks and votes betweeen Stakers and MNs
})
```

## Getblock

```js
var block = 1685805
tango.getblock(block).then(result => { // "Block" is an integer of the desired block. Result is an Object
  console.log(JSON.stringify(result)) // Logs the block and it's winners
})
```

## Getaddress

```js
var address = "D6HPrF2BW4BBSrKn7g7v3up9sActhjNTfV"
tango.address(address).then(result => { // "Address" is a string of the desired coin address. Result is an Object
  console.log(JSON.stringify(result)) // Logs the address and it's TangoAlpha stats (voteweight, balance, blocksseen)
})
```
