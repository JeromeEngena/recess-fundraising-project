const { Project, Funder} = require('../models')

const db = {
  saveProjectToDB: ({fundraiser, callback}) => {
    const projectModel = new Project(fundraiser)
    projectModel.save((error, fundraiser) => {
      if (error)
        callback(error, null)
      callback(null, fundraiser)
    })
  },

  getAProject: ({query, callback}) => {
    // if query is object with key _id, use findById
    // else, use findOneAndUpdate
  },

  getAllProjects: ({callback}) => {
    Project.find({}, (error, projects) => {
      if (error)
        callback(error, null)
      callback(null, projects)
    })
  },

  deleteAProject: ({query, callback}) => {
    Project.findByIdAndDelete(query, (error, deletedProject) => {
      if (error)
        callback(error, null)
      callback(null, deletedProject)
    })
  },

  updateProject: ({query, callback}) => {
    Project.findByIdAndUpdate(query, {new: true}, (error, updatedProject) => {
      if (error)
        callback(error, null)
      callback(null, updatedProject)
    })
  },

  findIfProjectExists: ({query, callback}) => {
    Project.exists(query, (error, result) => {
      if (error)
        callback(error, null)
      callback(null, result)
    })
  },

  findSectionOfProject: ({query, callback}) => {
    
  }


}

export default db