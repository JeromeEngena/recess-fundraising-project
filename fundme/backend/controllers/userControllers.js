require('dotenv').config()
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
const jwt = require('jsonwebtoken')

/**
 * post: register user
 * get: login user 
 * post: verify user 
 * delete: remove user 
 * post: update user info
 * 
 * 
 * ADMIN ROLES
 * get: get all users
 * get: get a user by -name -id -stats
 * delete: remove all users 
 * post: verify user
 */

const bcrypt = require('bcrypt')
const { User, Project } = require('../models')
const jwtAuth = require('../services/Auth/AuthController')

async function hashPassword(password, callback) {
  const SALT_ROUNDS = 10
  await bcrypt.hash(password, SALT_ROUNDS, (error, hash) => {
    if (error)
      callback(error, null)
    callback(null, hash)
  })
}

async function comparePasswords(plaintextPassword, hashedPassword, callback) {
  await bcrypt.compare(plaintextPassword, hashedPassword, (error, result) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, result)
    }
  })
}

function makeError(error, message) { // handle status codes and check for request.methods always
  return {
    Message: message,
    Error: error
  }
}

function makeData(data) {
  return {
    status: 200,
    data: data
  }
}

module.exports = {
  // registerUser: (req, res, next) => {
  //   const {first_name, last_name, email, telephone, password } = req.body
  //   User.exists({ $or: [{ email: email }, { 'contact.telephone': telephone }] }, (error, userExists) => {
  //     if (error) {
  //       res.json({ status: 500, message: 'Error on server' })
  //       return
  //     }

  //     if (userExists) {
  //       res.json({ status: 404, message: 'User already exists' })
  //       return
  //     } else { 
    
  //     hashPassword(password, (error, hashedPassword) => {
  //       if (error) {
  //         res.json({ status: 500, message: 'Error on server' })
  //         return
  //       }

  //         const user = new User({
  //           first_name: first_name,
  //           last_name: last_name,
  //           email: email,
  //           contact: {telephone: telephone },
  //           password: hashedPassword
  //         })
  //         user.save((error, user) => {
  //           if (error)
  //             res.json({ status: 500, message: 'Error on server' })
  //           else if (user)
  //             res.json({ user, status: 201, message: 'User created successfully'})
  //         })
  //       })
  //     } 
  //   })
  // },
  registerUser: (req, res, next) => {
    hashPassword(req.body.password, (error, hashedPassword) => {
      if (error) {
        res.json({ status: 500, message: 'Error on server' })
        return
      }

      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        contact: {telephone: req.body.telephone },
        password: hashedPassword
      })
      user.save((error, user) => {
        if (error) {
          res.json({ status: 500, message: 'Error on server' })
          return
        }
        else if (user) {
          res.json({ user: user, status: 201, message: 'User created successfully'})
        } 
      })
    })
  },

  loginUser: (req, res, next) => {
    const { email, password } = req.body
    User.findOne({ email: email }, (error, user) => {
      if (error) 
        res.json({ status: 500, message: 'Error on the server' })
      if (!user)
        res.json({ status: 404, message: 'No user found' })

      // serialize the user
      const serializedUser = { _id: user._id}
      comparePasswords(password, user.password, (error, passwordsMatch) => {
        if (error)
          res.json(({ status: 500, message: 'Error on server', auth: false, token: null })) 
        if (!passwordsMatch) 
          res.json(makeData({ status: 401, message: 'Unauthorized', auth: false, token: null }))
          
        res.json({ status: 200, auth: true, accessToken: jwtAuth.generateAccessToken(serializedUser), refreshToken: jwtAuth.generateRefreshToken(serializedUser) })
      })
    })
  },

  // updateUser: (req, res, next) =>  {

  //   User.findById(req.params.id, (error, user) => {
  //     if (error) 
  //       res.json(makeError(error, `FAILED TO FIND USER WITH ID ${req.params.id}`))

  //     if (user) {
  //       // const { password, email, telephone, verified, active } = req.body
  //       const updatedFields = {}
  //       Object.entries(req.body).forEach((key,value) => {
  //         if (key === 'telephone' || key === 'verified') {
  //           User.updateOne(user.id, { [`contact.${key}`]: value })
  //         } else {
  //           User.updateOne(user.id, {  })
  //         }
  //       })
  //   })
  // },

  getAllUsers: (req, res, next) => {
    User.find({}, (error, users) => {
      if (error)
        res.json(makeError(error, 'FAILED TO GET ALL THE USERS!'))
      res.json(users)
    })
  },

  getSingleUser: (req, res, next) => {
    const { id } = req.params
    User.findById(id, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND USER WITH ID: ${id}`))
      res.json(user)
    })
  },

  deactivateUser: (req, res, next) => {
    const { id } = req.params
    User.findByIdAndUpdate(id, { active: false, _dateClosed: new Date().toLocaleString() }, { new: true }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO DEACTIVATE USER WITH ID ${id}`))
      res.json(user)
    })
  },

  deleteUser: (req, res, next) => {
    const { id } = req.params
    User.findByIdAndDelete(id, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND AND DELETER USER WITH ID ${id}`))
      res.json(makeData(user))
    })        
  },

  verifyUser: (req, res, next) => { // add this to schema, so user is automatically verified on NIN being presented
    const { id } = req.params
    User.findByIdAndUpdate(id, { verified: true }, { new: true }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO VERIFY USER WITH ID: ${id}`))
      res.json(makeData(user.verified))
    })
  }, 

  forgotPassword: (req, res, next) => {

  },

  resetPassword: (req, res, next) => {

  },

  setUserLocation: (req, res, next) => {
    const { id, lat, long } = req.params
    User.findByIdAndUpdate(id, { ['location.precise.coordinates']: [ lat, long ] }, { new: true }, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO UPDATE PRECISE LOCATION OF USER WITH ID: ${id}`))
      res.json(makeData(user.location))
    })
  },

  getUserProjects: (req, res, next) => {
    const { id } = req.params
    User.findById(id, (error, user) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND USER WITH ID: ${id}`))

        Project.find({ _id: { $in: user.projects } }, (error, projects) => {
          if (error) 
            res.json(makeError(error, `FAILED TO GET PROJECTS OF USER WITH ID ${id}`))
          res.json(projects)
        })
    })
  },

  addToUserProjects: (req, res, next) => {

  },

  setThankYou: (req, res, next) =>  {
    const { id } = req.params
    const { thanks } = req.body
    Project.findByIdAndUpdate(id, { thanks: thanks }, { new: true }, (error, project) => {
      if (error) 
        res.json(makeError(error, `FAILED TO SET THANK YOU MESSAGE TO PROJECT WITH ID ${id}`))
        // send email to all visible funders with nodemailer
      res.json(projects)
    }) 
   }

 } 