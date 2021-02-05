/**
 * post:    create a funder
 * get:     find funder - by telephone
 * get:     find all funder projects_funded
 * update:  funder - projects_funded
 * post:    add comment to project
 * 
 * 
 */

const express = require('express')
const router = express.Router()

const { Funder } = require('../../controllers')

router.post('/fund', Funder.createFunder)
router.post('/projects/add', Funder.appendToFunderProjects)
router.get('/', Funder.getAllFunders)
router.get('/:id', Funder.getFunderByID)
router.delete('/:id', Funder.deleteFunder)
router.get('/params/:telephone', Funder.findFunderByParam)

module.exports = router