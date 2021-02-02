/**
 * post: create funder
 * get: get no. of funders
 * get: get funder stats y -location & proximity
 * delete: remove funder (data)
 * post: migrate funder to user
 * post: verify funder
 * 
 * 
 * ADMIN ROLES
 * get: get all funders
 * 
 */

 const { Funder, Project } = require('../models')

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
   createFunder: (req, res, next) => {
     // check if funder of similar telephone is not present
    const { first_name, last_name, email, telephone, projectFunded } = req.body
    const funder = new Funder({
      first_name: first_name,
      last_name: last_name,
      email: email,
      telephone: telephone,
      projects_funded: [projectFunded]
    })
    funder.save((error, funder) => {
      if (error)
        res.json(makeError(error, 'FAILED TO CREATE FUNDER'))
      res.json(makeData(funder))
    })
   },
   
   appendToFunderProjects: (req, res, next) => {

   },

   getAllFunders: (req, res, next) => {
     Funder.find({}, (error, funder) => {
      if (error)
        res.json(makeError(error, 'FAILED TO GET ALL THE FUNDERS!'))
      res.json(makeData(funder))
     })
   },

   getFunderByID: (req, res, next) => {
    const { id } = req.params
    Funder.findById(id, (error, funder) => {
      if (error)
        res.json(makeError(error, `FAILED TO FIND FUNDER WITH ID ${id}`))
      res.json(makeData(funder))
     })
   },

   findFunderByParam: (req, res, next) => {
    Funder.findOne({ telephone: req.params.telephone }, (error, funder) => {
      if (error)
          res.json(makeError(error, `FAILED TO QUERY FUNDER WITH TELEPHONE ${req.params.telephone}.`))
        res.json(makeData(funder))
    })
  },

  deleteFunder: (req, res, next) => {
    const { id } = req.params
    Funder.findByIdAndDelete(id, (error, funder) => {
     if (error)
       res.json(makeError(error, `FAILED TO FIND AND DELETER FUNDER WITH ID ${id}`))
     res.json(makeData(funder))
    })
  }
}


