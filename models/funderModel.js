const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Funder', new Schema({
  firstName: { type: String, required: true, immutable: true },
  lastName: { type: String, required: true, immutable: true },
  email: { type: String, default: null },
  telephone: { type: String, required: true, immutable: true },
  deleted: { type: Boolean, default: false },
  fundraisers: { type: [Schema.Types.ObjectId], ref: 'Fundraiser', default: [] },
  _dateDeleted: { type: String, default: null }
}, {
  collection: 'funders',
  minimize: false,
  strict: true,
  useNestedStrict: true,
  timestamps: {
    createdAt: '_dateCreated',
    updatedAt: '_dateUpdated'
  }
}))