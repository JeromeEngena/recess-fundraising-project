/**
 * _id: ObjectID
 * name: String
 * email: String
 * password: String
 * telephone: String
 * NIN: String
 * authorized: Boolean
 * roles: [ strings ]
 * _dateCreated: Date
 * _dateUpdated: Date
 * _dateClosed: Date
 */

 const mongoose = require('mongoose')
 const Schema = mongoose.Schema

 const roles = { 
  'TIER1_ADMIN': {
    description: 'Admin can read, write, update and delete from db.',
    privilages: ['Read', 'Write', 'Delete', 'Update']
  },
  'TIER2_ADMIN': {
    description: 'Admin can read, write and update db.',
    privilages: ['Read', 'Write', 'Update']
  },
  'TIER3_ADMIN': {
    description: 'Admin can read and write to db.',
    privilages: ['Read', 'Write']
  },
  'TIER4_ADMIN': {
    description: 'Admin can only read from db.',
    privilages: ['Read']
  },
 }

 export default Admin = mongoose.model('Admin', new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true },
   password: { type: String, required: true },
   telephone: { type: String, required: true },
   NIN: { type: String, required: true },
   authorized: { type: Boolean, required: true, default: false },
   active: { type: Boolean, required: true, default: getStatus },
   roles: [{
     role: { type: String, required: true, default: 'TIER4_ADMIN', enum: Object.keys(roles) },
     privilages: { type: [{ type: String }], required: true, default: getPrivilages, enum: getPrivilages },
     description: { type: String, required: true, default: getDescription }
   }],
   _dateArchived: { type: Date, required: true, default: getDateArchived }
  }, {
    collection: 'admins',
    minimize: false,
    strict: true,
    useNestedStrict: true,
    timestamps: {
      createdAt: '_dateCreated',
      updatedAt: '_dateUpdated'
   }
 }))

 function getStatus() {
   return this.authorized
 }

 function getPrivilages() {
   return roles[this.role].privilages
 }

 function getDescription() {
   return roles[this.role].description
 }

 function getDateArchived() {
   this.active ? null : Date.now()
 }