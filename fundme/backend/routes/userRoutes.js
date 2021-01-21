const express = require('express')
const router = express.Router()

const { User } = require('../controllers')

router.get('/', User.getAllUsers)
router.post('/register', User.registerUser)
router.get('/login', User.loginUser)
router.get('/:id', User.getSingleUser)
router.post('/deactivate/:id', User.deactivateUser)
router.delete('/delete/:id', User.deleteUser)
router.post('/verify/:id', User.verifyUser)
router.post('/location/:id', User.setUserLocation)
router.get('/projects/:id', User.getUserProjects)

module.exports = router