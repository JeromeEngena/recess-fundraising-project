const model = require('mongoose').model
const Schema = require('mongoose').Schema
const uniqid = require('../utils/uniqid')
const {fundraiserCategories} = require('../utils/enums')

module.exports = model('Fundraiser', new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
  name: { type: String, required: true, immutable: true },
  status: { type: String, default: 'Active', enum: ["Active", "Closed"] },
  verification: { type: Boolean, default: false },
  story: { type: String, required: true },
  images: [{
    path: { type: String, required: true },
    title: { type: String, required: true },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true } 
    }
  }],
  category: { type: String, required: true, default: 'Personal', enum: fundraiserCategories },
  country: { type: String, required: true, default: 'Uganda' }, 
  stats: {
    currency: { type: String, default: 'UGX' },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    funders: [{
      funderId: { type: Schema.Types.ObjectId, ref: 'Funder', required: true },
      donation: { type: Number, required: true },
      tip: { type: Number, default: 0, required: true },
      currency: { type: String, default: 'UGX' },
      visibile: { type: Boolean, required: true, default: true },
      location: {
        country: { type: String, default: 'Uganda' },
        precise: {
          type: { type: String, enum: ['Point'], default: 'Point' },
          coordinates: { type: [Number], required: true }
        }
      },
      _dateCreated: { type: String, required: true, default: Date.now }
    }],
    thanks: [{
      _id: {type: 'String', default: uniqid.generateUniqid()},
      message: {type: String, required: true},
      time: {type: String, default: Date.now }
    }]
  },
  _dateClosed: { type: Date, default: null }
}, {
  collection: 'fundraisers',
  minimize: false,
  strict: true,
  useNestedStrict: true,
  timestamps: {
    createdAt: '_dateCreated',
    updatedAt: '_dateUpdated'
  }
}))