const express = require('express')
const router = express.Router()

const { User } = require('../controllers')
const jwtAuth = require('../services/Auth/AuthController')

router.get('/', jwtAuth.verifyAccessToken ,jwtAuth.renewAccessToken, User.getAllUsers)
router.post('/', User.registerUser)
router.post('/login', User.loginUser)
router.get('/:id', jwtAuth.verifyAccessToken, User.getSingleUser)
router.post('/deactivate/:id', jwtAuth.verifyAccessToken, User.deactivateUser)
router.delete('/delete/:id',jwtAuth.verifyAccessToken, User.deleteUser)
router.post('/verify/:id', jwtAuth.verifyAccessToken, User.verifyUser)
router.post('/location/:id/:lat/:long', jwtAuth.verifyAccessToken, User.setUserLocation)
router.get('/projects/:id', jwtAuth.verifyAccessToken, User.getUserProjects)

router.post('/thanks', User.setThankYou)

module.exports = router