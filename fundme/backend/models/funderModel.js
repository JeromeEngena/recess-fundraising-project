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
  first_name: { type: String, required: true, immutable: true },
  last_name: { type: String, required: true, immutable: true },
  email: { type: String, default: null },
  telephone: { type: String, required: true, immutable: true },
  deleted: { type: Boolean, default: false },
  projects_funded: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    open_profile: { type: Boolean, default: false, required: true },
    currency: { type: String, default: 'UGX', enum: ['UGX'] },
    amount: { type: Number, required: true },
    tip: { type: Number, default: 0, required: true },
    date: { type: String, default: Date.now },
    location: [{
      country: { type: String, default: 'Uganda', enum: ['Uganda'] },
      precise: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true }
      }
    }]
  }],
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