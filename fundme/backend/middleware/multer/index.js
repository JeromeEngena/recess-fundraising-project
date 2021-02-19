const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => { 
    callback(null, `public/uploads/images/${req.params.folderName}`)
  },

  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname+path.extname(file.originalname)}`)
  }
})

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024*1024*5
  }
})

exports.getImagesFromServer = (folderName) => {
}

exports.multerImageUpload = (req, res, next) => {

}