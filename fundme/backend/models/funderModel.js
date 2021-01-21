/**
 * _id: ObjectID
 * name: String
 * email: String
 * telephone: String
 * location: [{
 *  country: string
 *  precise: {
 *    type: {
 *      type: String
 *      coordinates: {
 *        type: [ String ]
 *      }
 *    }
 *   }
 * }]
 * projects_funded: [{
 *   _id: projectID
 *   currency: String
 *   donation: Number
 *   tip: Number
 *   date: Date
 * }]
 * _dateCreated: Date
 * _dateUpdated: Date
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Funder', new Schema({
  name: { type: String, required: true, immutable: true },
  email: { type: String, default: null },
  telephone: { type: String, required: true, immutable: true },
  projects_funded: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    open_profile: { type: Boolean, default: false, required: true },
    currency: { type: String, default: 'UGX', enum: ['UGX'], required: true },
    donation: { type: Number, required: true },
    tip: { type: Number, default: 0, required: true },
    date: { type: Date, default: Date.now, required: true },
    location: [{
      country: { type: String, default: 'Uganda', enum: ['Uganda'] },
      precise: {
        type: { type: String, enum: ['Point'], required: true },
        coordinates: { type: [Number], required: true }
      }
    }]
  }]
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