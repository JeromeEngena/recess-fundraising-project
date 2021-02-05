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
  owner: {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
    ownerFirstName: { type: String, required: true, immutable: true },
    ownerLastName: { type: String, required: true, immutable: true },
    ownerEmail: { type: String, required: true },
    ownerTelephone: { type: String, required: true },
    ownerVerification: { type: Boolean }
  },
  projectName: { type: String, required: true, immutable: true },
  projectStatus: { type: String, default: 'Active', enum: ["Active", "Closed"] },
  projectVerification: { type: Boolean, default: false },
  projectDescription: {
    body: { type: String, required: true },
    coverImages: [{
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
    currency: { type: String, default: 'UGX' },
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
  _dateClosed: { type: Date, default: null }
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