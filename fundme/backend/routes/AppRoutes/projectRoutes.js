/**
 * post:    create a project 
 * post:    verify project
 * update:  update project details -body -active -target
 * update:  update current
 * delete:  delete project
 * update:  close project 
 * post:    add thanks message to project
 * post:    reply to comment on project  
 */

const express = require('express')
const router = express.Router()

const { Project } = require('../../controllers')

router.post('/', Project.createProject)
router.get('/', Project.getAllProjects)
router.get('/:id', Project.getSingleProject)
router.delete('/:id', Project.deleteProject)
router.post('/deactivate/:id', Project.deactivateProject)
router.post('/verify/:id', Project.verifyProject)
router.post('/current/:id', Project.setCurrent)
// route.get('/funders', Project.getProjectFunders)

module.exports = router