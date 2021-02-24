const express = require('express')
const router = express.Router()
const {EmailSubscriber} = require('../controllers')

router.post('/', EmailSubscriber.createEmailSubscriber)
router.get('/', EmailSubscriber.getAllEmailSubscribers)
router.get('/:_id', EmailSubscriber.getEmailSubscriberById)
router.get('/identify/name/:name', EmailSubscriber.getEmailSubscriberByName)
router.get('identify/email/:email', EmailSubscriber.getEmailSubscriberByEmail)
router.get('/identify', EmailSubscriber.getEmailSubscribers)
router.delete('/:_id', EmailSubscriber.deleteEmailSubscriber)

module.exports = router