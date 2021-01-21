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
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
  active: { type: Boolean, default: true },
  verified: { type: Boolean, default: false },
  description: {
    body: { type: String, required: true },
    cover_images: [{
      path: { type: String, required: true },
      title: { type: String, required: true }
    }],
    category: { type: String, required: true, default: 'Personal', enum: categories },
    country: { type: String, required: true, default: 'Uganda' }
  },  
  stats: {
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    funders: [{ type: Schema.Types.ObjectId, ref: 'Funder' }],
    thanks: { type: String, default: null },
    comments: [{
      _id: { type: Schema.Types.ObjectId, required: true },
      comment: { type: String, required: true },
      funder: { type: Schema.Types.ObjectId, required: true, ref: 'Funder' }
    }]
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