require('dotenv').config()
const momo = require('mtn-momo')

const { Collections } = momo.create({
  callbackHost: process.env.CALLBACK_HOST
})

exports.collections = Collections({
  userSecret: process.env.COLLECTIONS_USER_SECRET,
  userId: process.env.COLLECTIONS_USER_ID,
  primaryKey: process.env.COLLECTIONS_PRIMARY_KEY
})

exports.collectPayment = ({ 
  telephone,
  currency,
  projectId,
  donation,
  payerMessage,
  payeeNote
 }) => {
  return collections.requestToPay({ 
    amount: donation,
    currency: currency,
    externalId: projectId,
    payer: {
      partyIdType: momo.PayerType.MSISDN,
      partyId: phone
    },
    payerMessage: payerMessage,
    payeeNote: payeeNote
  })
}
