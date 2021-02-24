const model = require('mongoose').model
const Schema = require('mongoose').Schema 

module.exports = model('emailSubscriber', new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  _dateCreated: {type: String, default: Date.now},
  _dateClosed: {type: String, default: null}
}, {
  collection: 'emailSubscribers',
  minimize: false,
  strict: true,
  useNestedStrict: true,
  timestamps: false
}))