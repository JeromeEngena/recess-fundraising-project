const model = require('mongoose').model
const Schema = require('mongoose').Schema

module.exports = model('User', new Schema({
  firstName: { type: String, required: true, immutable: true },
  lastName: { type: String, required: true, immutable: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  NIN: { type: String, default: null },
  verified: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  contact: {
    verified: { type: Boolean, default: false },
    telephone: { type: String, required: true }
  },
  location: {
    country: { type: String, default: 'Uganda' }
  },
  fundraisers: { type: [Schema.Types.ObjectId], ref: 'Fundraiser', required: true, default: [] },
  _dateClosed: { type: String, default: null }
}, {
  collection: 'users',
  minimize: false,
  strict: true,
  useNestedStrict: true,
  timestamps: {
    createdAt: '_dateCreated',
    updatedAt: '_dateUpdated'
  }
}))