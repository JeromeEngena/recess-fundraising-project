// module imports
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const colors = require('colors')
const cors = require('cors')

// module configurations 
const routes = require('./routes')


// base constants
const app = express()
const PORT = process.env.PORT || 4000

// middle ware
app.use(express.static('public')) 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cors())
app.use('/users', routes.userRoutes)
app.use('/fundraisers', routes.fundraiserRoutes)
app.use('/funders', routes.funderRoutes)

// db connections
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true})
  .then(() => console.log(colors.green('SUCCESSFULLY CONNECTED TO THE DATABASE')))
  .catch(error => {
    console.log(colors.red('FAILED TO CONNECT TO DATABASE. INITIAL CONNECTION ERROR'))
    console.log(colors.red(`ERROR_NAME: ${error.name} \nERROR_MESSAGE: ${error.message}`))  
  })


// routes
app.get('/', (req, res, next) => {
  res.status(200).send('Hello there, welcome to fundMe api.')
})


// server setup
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)) 
