/**
 * _id: ObjectID
 * name: String
 * email: String
 * telephone: String
 * location: {
 *  country: string
 *  precise: {
 *    type: {
 *      type: String
 *      coordinates: {
 *        type: [ String ]
 *      }
 *    }
 *   }
 * }
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

export default Funder = mongoose.model('Funder', new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  location: {
    country: { type: String, default: 'Uganda' },
    precise: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true }
    }
  },
  projects_funded: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    currency: { type: String, enum: ['UGX'], required: true },
    donation: { type: Number, required: true },
    tip: { type: Number, default: 0, required: true },
    date: { type: Date, required: true }
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