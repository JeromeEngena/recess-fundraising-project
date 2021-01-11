const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { User } = require('./userModel')
const { Funders } = require('./funderModel')

const projectSchema = new Schema({
  name: { type: String },
  verified: { type: Boolean, default: false },
  description: { type: String },
  cover_image: { type: String },
  category: { type: String, default: 'Personal project',
    enum: [
      'Sports',
      'Schools and education',
      'Politics',
      'Local community',
      'Volunteering',
      'In memory',
      'Volunteering',
      'In memory',
      'Health and medical',
      'Gardens and environments',
      'Emergencies',
      'Disability support',
      'Creative arts and culture',
      'Children and youth',
      'Animals and pets ',
      'Personal project'
    ]
  },
  owner: { type: User }, 
  location: {
    country: { type: String, default: 'Uganda' },
    town: { type: String },
    precise_location: {
      type: { type: { type: String }, enum: ['Point'], required: true },
      coordinates: {
        type: [{ type: Number }]
      }
    }
  },
  targets: {
    target_value: { type: Number },
    current_value: { type: Number },
    currency: { type: String, default: 'UGX', required: true }
  },
  deposit_account: { type: String },
  funders: { type: [ Funders ] }
}, {
  collection: 'projects',
  minimize: false,
  strict: true,
  useNestedStrict: true,
  timestamps: {
    createdAt: 'project_opened_on',
    updatedAt: 'project_updated_on'
  }
})

const Project = mongoose.model('Project', projectSchema)
export default Project