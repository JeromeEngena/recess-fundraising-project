const mongoose = require('mongoose')
const {User} = require('../models')

exports.createUser = ({user, callback}) => {
  // console.log(user)
  const newUser = new User(user)
  newUser.save((error, createdUser) => {
    if (error)
      return callback(error, null)
    if (!createdUser)
      return callback(null, null)
    callback(null, createdUser)
  })
}

exports.findIfUserExists = ({query, callback}) => {
  User.exists(query, (error, result) => {
    if (error)
      return callback(error, null)
    callback(null, result)
  })
}

exports.getUser = ({query, callback}) => { // failed manual postman test
  User.findOne(query, (error, user) => {
    if (error)
      return callback(error, null)
    if (!user)
      return callback(null, null)
    callback(null, user)
  })
}

exports.getUsers = ({query, callback}) => {
  User.find(query, (error, users) => {
    if (error)
      return callback(error, null)
    if (!users)
      return callback(null, null)
    callback(null, users)
  })
}

exports.getUserById = ({query, callback}) => {
  User.findById(query, (error, user) => {
    if (error)
      return callback(error, null)
    if (!user)
      return callback(null, null)
    callback(null, user)
  })
}

exports.getAllUsers = ({callback}) => {
  User.find({}, (error, users) => {
    if (error)
      return callback(error, null)
    if (!users)
      return callback(null, null)
    callback(null, users)
  })
}

exports.deleteUser = ({query, callback}) => {
  User.findByIdAndDelete(query, (error, deletedUser) => {
    if (error)
      return callback(error, null)
    if (!deletedUser)
      return callback(null, null)
    callback(null, deletedUser)
  })
}

exports.updateUser = ({query, update, callback}) => {
  User.findByIdAndUpdate(query, update, {new: true}, (error, updatedUser) => {
    if (error)
      return callback(error, null)
    if (!updatedUser)
      return callback(null, null)
    callback(null, updatedUser)
  })
}

exports.getSectionOfUser = ({query, section, callback}) => {
}

