/**
 * _id: ObjectID
 * name: String
 * owner: ObjectID (_userID)
 * active: Boolean
 * verified: Boolean
 * description: {
 *  body: String
 *  cover_images: [{
 *    path: String
 *    title: String
 *  }]
 *  category: String
 *  country: string
 * 
 * }
 * stats: {
 *  target: Number
 *  current: Number
 *  funders: [ String (_funderID) ]
 * }
 * _dateCreated: Date
 * _dateUpdated: Date
 * _dateClosed: Date
 */

 /**
 * FUTURE CATEGORIES
 * Politics
 * Religious
 * 
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categories = [
  "Personal",
  "Education",
  "Medical",
  "Children and Youth",
  "Creatives",
  "Sports",
  "Volunteering",
  "In memory",
  "Animals and Pets",
  "Nature"
]

module.exports = mongoose.model('Project', new Schema({
  name: { type: String, required: true, immutable: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
  active: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
  description: {
    body: { type: String, required: true },
    cover_images: [{
      path: { type: String, required: true },
      title: { type: String, required: true },
      dimensions: {
        width: { type: Number, required: true },
        height: { type: Number, required: true }
      }
    }],
    category: { type: String, required: true, default: 'Personal', enum: categories },
    country: { type: String, required: true, default: 'Uganda' }
  },  
  stats: {
    curreny: { type: String, default: 'UGX' },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    funders: [{
      funderId: { type: Schema.Types.ObjectId, ref: 'Funder', required: true },
      amount: { type: Number, required: true },
      currency: { type: String, default: 'UGX' },
      time: { type: String, required: true }
    }],
    thanks: { type: String, default: null },
    // comments: [{
    //   _id: { type: Schema.Types.ObjectId },
    //   comment: { type: String, required: true },
    //   time: { type: String, required: true },
    //   owner: { type: Schema.Types.ObjectId, required: true, ref: 'Funder' }
    // }]
  },
  _dateClosed: { type: Date }
}, {
  collection: 'projects',
  minimize: false,
  strict: true,
  useNestedStrict: true,
  timestamps: {
    createdAt: '_dateCreated',
    updatedAt: '_dateUpdated'
  }
}))