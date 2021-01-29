/**
 * _id: ObjectID
 * name: String
 * email: String
 * password: String
 * telephone: [ String ]
 * NIN: String
 * location: String
 * verified: Boolean
 * projects: [ _projectID: ObjectID (_projectID) ]
 * _dateCreated: Date
 * _dateUpdated: Date
 * _dateClosed: Date
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
  first_name: { type: String, required: true, immutable: true },
  last_name: { type: String, required: true, immutable: true },
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
    country: { type: String, required: true, default: 'Uganda' },
    precise: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number] }
    }
  },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  _dateClosed: { type: Date, default: null, immutable: true }
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