const req = require('requestify')
const basePublicUrl = 'https://tangoalpha.gq/api/v1/'

exports.blocktime = async function () {
  try {
    var result = await req.get(basePublicUrl + 'averageblocktime')
    result = Number(result.body)
    if (result <= 0 || result === NaN || result === null || result === undefined) {
      throw 'API Result doesn\'t seem right, TangoAlpha may be having problems'
    }
    return result
  } catch (err) {
    if (err.body) {
      console.warn('TangoAlphaAPI Error caught: (' + err.body + ')')
    } else {
      console.warn('TangoAlphaAPI Error caught: (' + err + ')')
    }
  }
}

exports.roi = async function () {
  try {
    var result = await req.get(basePublicUrl + 'estimatedroi')
    result = Number(result.body)
    if (result <= 0 || result === NaN || result === null || result === undefined) {
      throw 'API Result doesn\'t   seem right, TangoAlpha may be having problems'
    }
    return result
  } catch (err) {
    if (err.body) {
      console.warn('TangoAlphaAPI Error caught: (' + err.body + ')')
    } else {
      console.warn('TangoAlphaAPI Error caught: (' + err + ')')
    }
  }
}

exports.blockdrift = async function () {
  try {
    var result = await req.get(basePublicUrl + 'getblockdrift')
    result = JSON.parse(result.body)
    if (!result || result && !result[0]) throw 'API Result doesn\'t seem right, TangoAlpha may be having problems'
    return result
  } catch (err) {
    if (err.body) {
      console.warn('TangoAlphaAPI Error caught: (' + err.body + ')')
    } else {
      console.warn('TangoAlphaAPI Error caught: (' + err + ')')
    }
  }
}

exports.getdb = async function () {
  try {
    var result = await req.get(basePublicUrl + 'getdb')
    result = JSON.parse(result.body)
    if (!result || result && !result[0]) throw 'API Result doesn\'t seem right, TangoAlpha may be having problems'
    return result
  } catch (err) {
    if (err.body) {
      console.warn('TangoAlphaAPI Error caught: (' + err.body + ')')
    } else {
      console.warn('TangoAlphaAPI Error caught: (' + err + ')')
    }
  }
}
exports.mnstcount = async function () {
  try {
    var result = await req.get(basePublicUrl + 'mnstcount')
    result = JSON.parse(result.body)
    if (!result || result && !result.results) throw 'API Result doesn\'t seem right, TangoAlpha may be having problems'
    return result.results
  } catch (err) {
    if (err.body) {
      console.warn('TangoAlphaAPI Error caught: (' + err.body + ')')
    } else {
      console.warn('TangoAlphaAPI Error caught: (' + err + ')')
    }
  }
}

exports.getblock = async function (height) {
  if (!height || height && Number(height) < 0 || height === null || height === undefined) throw "TangoAlphaAPI: Missing or incorrect integer 'height'"
  try {
    var result = await req.get(basePublicUrl + 'getblock?height=' + height)
    if (result.body === null || result.body === "null") throw "TangoAlphaAPI: Block not found, invalid blockheight?"
    result = JSON.parse(result.body)
    return result
  } catch (err) {
    if (err.body) {
      console.warn('TangoAlphaAPI Error caught: (' + err.body + ')')
    } else {
      console.warn('TangoAlphaAPI Error caught: (' + err + ')')
    }
  }
}

exports.address = async function (addr) {
  if (!addr || addr && addr.length < 34 || addr === null || addr === undefined) throw "TangoAlphaAPI: Missing or incorrect string 'address'"
  try {
    var result = await req.get(basePublicUrl + 'tango?address=' + addr)
    if (result.body === null || result.body === "null") throw "TangoAlphaAPI: Address not found, invalid address?"
    result = JSON.parse(result.body)
    return result
  } catch (err) {
    if (err.body) {
      console.warn('TangoAlphaAPI Error caught: (' + err.body + ')')
    } else {
      console.warn('TangoAlphaAPI Error caught: (' + err + ')')
    }
  }
}
