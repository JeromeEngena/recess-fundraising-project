require('dotenv').config()
const axios = require('axios')
const uniqid = require('../../utils/uniqid')

exports.requestFunderToPay = ({telephone, totalToPay, projectName, callback}) => {
  axios({
    method: 'post', 
    url: 'https://www.easypay.co.ug/api/',
    data: {
      username: process.env.EASY_PAY_CLIENT_ID,
      password: process.env.EASY_PAY_USER_SECRET,
      action: "mmdeposit",
      amount: totalToPay,
      currency: "UGX",
      phone: telephone,
      reference: uniqid.generateUniqid(),
      reason: `Donation towards "${projectName}"`
    }
  })
  .then(response => {
    const transactionReceipts = response.data
    callback(null, transactionReceipts)
  })
  .catch(error => {
    callback(error, null)
  })
}

exports.payoutToUser = ({totalToPayout, telephone, callback}) => {
  axios({
    method: 'post',
    url: 'https://www.easypay.co.ug/api/',
    data: {
      username: process.env.EASY_PAY_CLIENT_ID,
      password: process.env.EASY_PAY_USER_SECRET,
      action: "mmpayout",
      amount: totalToPayout,
      currency: "UGX",
      phone: telephone,
    }
  })
  .then(response => {
    const transactionReceipts = response.data
    callback(null, transactionReceipts)
  })
  .catch(error => {
    callback(error, null)
  })
}