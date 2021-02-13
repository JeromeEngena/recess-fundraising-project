const axios = require('axios')

const easyPay = {
  requestToPay: ({body: {telephone, totalToPay, projectName}, callback}) => {
    const transcationReceipts = await axios.default( 
      {method: 'post', 
      url: 'https://www.easypay.co.ug/api/',
      data: {
        username: process.env.EASY_PAY_CLIENT_ID,
        password: process.env.EASY_PAY_USER_SECRET,
        action:"mmdeposit",
        amount: body.total,
        currency:"UGX",
        phone:body.telephone,
        reference: generateUniqueId(),
        reason:`Donation towards fundraiser: ${body.projectName}`}
    })
  }
}

export default easyPay