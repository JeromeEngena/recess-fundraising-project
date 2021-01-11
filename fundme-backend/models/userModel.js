const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  NIN: { type: String },
  telephones: [{ type: String }]
}, {
  collection: 'users',
  minimize: false,
  strict: true,
  useNestedStrict: true,
  timestamps: {
    createdAt: 'user_created_on',
    updatedAt: 'user_updated_on'
  }
})

const User = mongoose.model('User', userSchema)
export { userSchema as Users, User as userModel }
