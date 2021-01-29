/**
 * post: create a project
 * update: update project info
 * get: get projects by - popularity -location
 * post: close project
 * delete: remove a project
 * 
 * 
 * ADMIN ROLES
 * get: get all projects
 * delete: delete a project(s)
 */

 const { Project, Funder} = require('../models')

 function makeError(error, message) { // handle status codes and check for request.methods always
  return {
    Message: message,
    Error: error
  }
}

function makeData(data) {
  return {
    status: 200,
    data: data
  }
}

 module.exports = {
   createProject: (req, res, next) => {
    const { name, owner, description, category, country, target } = req.body
    const project = new Project({
      name: name,
      owner: owner,
      description: description,
      country: country,
      [stats.target]: target
    })
    project.save((error, project) => {
      if (error) 
        res.json(makeError(error, 'FAILED TO CREATE PROJECT.'))
      res.json(makeData(project))
    })
   },

   getSingleProject: (req, res, next) => {
     const { id } = req.params
     Project.findById(id, (error, project) => {
      if (error) 
        res.json(makeError(error, `FAILED TO GET PROJECT WITH ID ${id}`))
      res.json(makeData(project))
     })
   },

   getAllProjects: (req, res, next) => {
    Project.find({}, (error, projects) => {
      if (error) 
        res.json(makeError(error, 'FAILED TO GET ALL PROJECT.'))
      res.json(makeData(projects))
    })
   },

  //  updateProject: (req, res, next) => {
  //   const { id } = req.params
  //  },

   deactivateProject: (req, res, next) => {
    const { id } = req.params
    Project.findByIdAndUpdate(id, { active: false }, { new: true }, (error, project) => {
      if (error) 
        res.json(makeError(error, `FAILED TO DEACTIVATE PROJECT WITH ID ${id}`))
      res.json(makeData(project))
    })
   },

   deleteProject: (req, res, next) => {
    const { id } = req.params
    Project.findByIdAndDelete(id, (error, project) => {
      if (error) 
        res.json(makeError(error, `FAILED TO FIND AND DELETE USER WITH ID ${id}`))
      res.json(makeData(project))
    })
   },

   verifyProject: (req, res, next) => {
    const { id } = req.params
    Project.findByIdAndUpdate(id, { verified: true }, { new: true }, (error, project) => {
      if (error) 
        res.json(makeError(error, `FAILED TO FIND AND VERIFY USER WITH ID ${id}`))
      res.json(makeData(project))
    })
   },

   setCurrent: (req, res, next) => { // send this route to funder
    const { funderId, amount } = req.body
    const { id } = req.params
    Project.findByIdAndUpdate(id, 
      {[stats.current]: stats.current + amount, funders: funders.push({ funderId: funderId, amount: amount, time: new Date().toLocaleString()})},
      { new: true },
      (error, project)=> {
        if (error) 
          res.json(makeError(error, `FAILED TO UPDATE CURRENT AMOUNT OF PROJECT WITH ID ${id}`))
        res.json(makeData(project))
      })
   },

   getFunders: (req, res, next) => {
    const { id } = req.params
    Project.findById(id, (error, project) => {
      if (error) 
        res.json(makeError(error, `FAILED TO FIND USER WITH ID ${id}`))
      // find all funders whose ids are part of the id fields of the objects in funders in Project model
      Funder.find({ _id: { }})
    })
   },

   setThankYou: (req, res, next) =>  { //send route to user routes
    const { id } = req.params
    const { thanks } = req.body
    // send emails to funders with nodemailer
    Project.findByIdAndUpdate(id, { thanks: thanks })
   },

  //  addComment: (req, res, next) => {
  //   const { comment, time, owner } = req.body
  //   const { id } = req.params
  //   Project.findByIdAndUpdate(id, { comments: {$push: { comment:  }} })
  //  }
 }