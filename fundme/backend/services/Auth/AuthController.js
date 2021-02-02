require('dotenv').config()
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
const jwt = require('jsonwebtoken')

const refreshTokens = []
const accessTokens = []

exports.generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET_ACCESS_KEY, { expiresIn: 60 * 60 * 500 })
  accessTokens.push(accessToken)
  return accessToken
}

exports.generateRefreshToken = (userId) => {
  const refreshToken = jwt.sign({id: userId }, process.env.JWT_SECRET_REFRESH_KEY, { expiresIn: 60 * 60 * 24 * 1000 * 7 })
  refreshTokens.push(refreshToken)
  return refreshToken
}

exports.verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers['x-access-token']
  if (!accessToken || !accessTokens.includes(accessToken))
    res.json({ status: 403, auth: false, message: 'No token provided' })

  jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS_KEY, (error, decoded) => {
    if (error)
      res.json({ status: 500, auth: false, message: 'Failed to authenticate token.' }) 
    req.userId = decoded.userId
    next()
  })
}

exports.renewAccessToken = (req, res, next) => { 
  const refreshToken = req.body.token
  if (!refreshToken || !refreshTokens.includes(refreshToken))
    return res.json({ status: 403, message: 'Unauthorized' })
  
  jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH_KEY, (err, userId) => {
    if (error)
      return res.json({ status: 403, message: 'Unauthorized' })

    const accessToken = jwt.sign(userId, process.env.JWT_SECRET_ACCESS_KEY, { expiresIn: 60 * 60 * 500 })
    return res.json({ status: 201, accessToken: accessToken })
  })
}

