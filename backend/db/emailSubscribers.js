const mongoose = require('mongoose')
const {EmailSubscriber} = require('../models')

exports.createEmailSubscriber =({emailSubscriber, callback}) => {
  const newEmailSubscriber = new EmailSubscriber(emailSubscriber)
  newEmailSubscriber.save((error, createdEmailSubscriber) => {
    if (error)
      return callback(error, null)
    if (!createdEmailSubscriber)
      return callback(null, null)
    callback(null, createdEmailSubscriber)
  })
}

exports.findIfEmailSubscriberExists = ({query, callback}) => {
  EmailSubscriber.exists(query, (error, result) => {
    if (error)
      return callback(error, null)
    callback(null, result)
  })
}

exports.getEmailSubscriber = ({query, callback}) => {
  EmailSubscriber.findOne(query, (error, emailSubscriber) => {
    if (error)
      return callback(error, null)
    if (!emailSubscriber)
      return callback(null, null)
    callback(null, emailSubscriber)
  })
}

exports.getEmailSubscribers = ({query, callback}) => {
  EmailSubscriber.find(query, (error, emailSubscribers) => {
    if (error)
      return callback(error, null)
    if (!emailSubscribers)
      return callback(null, null)
    callback(null, emailSubscribers)
  })
}

exports.getEmailSubscriberById = ({query, callback}) => {
  EmailSubscriber.findById(query, (error, emailSubscriber) => {
    if (error)
      return callback(error, null)
    if (!emailSubscriber)
      return callback(null, null)
    callback(null, emailSubscriber)
  })
}

exports.getAllEmailSubscribers = ({callback}) => {
  EmailSubscriber.find({}, (error, emailSubscribers) => {
    if (error)
      return callback(error, null)
    if (!emailSubscribers)
      return callback(null, null)
    callback(null, emailSubscribers)
  })
}

exports.deleteEmailSubscriber = ({query, callback}) => {
  EmailSubscriber.findByIdAndDelete(query, (error, deletedEmailSubscriber) => {
    if (error)
      return callback(error, null)
    if (!deletedEmailSubscriber)
      return callback(null, null)
    callback(null, deletedEmailSubscriber)
  })
}

