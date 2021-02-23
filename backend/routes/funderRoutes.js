const router = require('express').Router()
const {Funder} = require('../controllers')

router.post('/', Funder.createFunder)
router.get('/', Funder.getAllFunders)
router.get('/:_id', Funder.getFunderById)
router.delete('/:id', Funder.deleteFunder)
router.get('/identify/:tel', Funder.getFunder)
router.post('/pay', Funder.processFunderDonation)

module.exports = router






// router.post('/projects/add', Funder.appendToFunderProjects)
// router.post('/save', Funder.saveFunder)