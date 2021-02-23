const router = require('express').Router()

const { Fundraiser } = require('../controllers')
const multer = require('../middleware/multer')

router.post('/', Fundraiser.createFundraiser)
router.post('/images/:folderName', multer.upload.array('fundraiserImages', 5), Fundraiser.uploadImagesToServer)
router.get('/', Fundraiser.getAllFundraisers)
router.get('/identify/:name', Fundraiser.getFundraiser)
router.get('/:_id', Fundraiser.getFundraiserById)
router.delete('/:_id', Fundraiser.deleteFundraiser)
router.post('/deactivate/:_id', Fundraiser.deactivateFundraiser)
router.post('/verify/:_id', Fundraiser.verifyFundraiser)
router.post('/current/:_id', Fundraiser.addFunderToFundraiser)
router.post('/thanks/:_id', Fundraiser.addThanksToFundraiser)

module.exports = router