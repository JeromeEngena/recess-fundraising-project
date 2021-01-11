const mongoose = require('mongoose')
const Schema = mongoose.Schema

const funderSchema = new Schema({
  name: { type: String },
  email: { type: String },
  telephone: { type: String },
  funding_value: {
    currency: { type: String, default: 'UGX', required: true},
    ammount: { type: Number }
  },
  tip: {
    paid: { type: Boolean, default: false },
    currency: { type: String, default: 'UGX', required: true},
    ammount: { type: Number }
  }
}, {
  collection: 'funders',
  minimize: false,
  strict: true,
  useNestedStrict: true,
  timestamps: {
    createdAt: 'funded_on',
    updatedAt: 'updated_funding_on'
  }
})

const Funder = mongoose.model('Funder', funderSchema)
export  { funderSchema as Funders, Funder as funderModel }