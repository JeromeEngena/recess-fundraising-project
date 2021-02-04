const express = require('express')
const router = express.Router()

const { User } = require('../controllers')

router.post('/', User.registerUser)
router.post('/login', User.loginUser)
router.get('/', User.getAllUsers)
router.get('/:id', User.getSingleUser)
router.post('/deactivate/:id', User.deactivateUser)
router.delete('/delete/:id', User.deleteUser)
router.post('/verify/:id', User.verifyUser)
router.post('/location/:id/:lat/:long', User.setUserLocation)
router.get('/projects/:id', User.getUserProjects)

router.post('/thanks', User.setThankYou)

module.exports = router