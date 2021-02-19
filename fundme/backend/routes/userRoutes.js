const express = require('express')
const router = express.Router()

const {User} = require('../controllers')

router.post('/', User.registerUser)
router.post('/login', User.loginUser)
router.get('/', User.getAllUsers)
router.get('/:_id', User.getUserById)
router.get('/:email', User.getUser)
router.post('/deactivate/:_id', User.deactivateUser)
router.delete('/delete/:_id', User.deleteUser)
router.post('/verify/:_id', User.verifyUser)
router.post('/reset-password/:_id', User.resetPassword)
router.post('/add-fundraiser/:_id', User.addFundraiserToUser)


// router.post('/thanks', User.setThankYou)
// router.post('/location/:_id/:lat/:long', User.setUserLocation)

module.exports = router