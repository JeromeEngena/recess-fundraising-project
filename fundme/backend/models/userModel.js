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

export default User = mongoose.model('User', new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  NIN: { type: String, default: null },
  verified: { type: Boolean, default: false },
  telephone: { type: [{ type: String, validate: [ arrayLength, 'User should have at least one telephone number' ] }] },
  location: {
    country: { type: String, required: true, default: 'Uganda' }
  },
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  _dateClosed: { type: Date }
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

function arrayLength(val) {
  return val.length > 0
}