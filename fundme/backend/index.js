// module imports
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const colors = require('colors')

// module configurations


// base constants
const app = express()
const PORT = process.env.PORT || 4000


// middle ware
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// db connections
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})
  .then(() => console.log(colors.green('#################### SUCCESSFULLY CONNECTED TO THE DATABASE ####################')))
  .catch(error => {
    console.log(colors.red('######################## FAILED TO CONNECT TO DATABASE. INITIAL CONNECTION ERROR ########################'))
    console.log(colors.red(`ERROR_NAME: ${error.name} \nERROR_MESSAGE: ${error.message}`))  
  })

mongoose.connection.on('error', error => {
  console.log(colors.red('######################## RECONNECTION ERROR EVENT. HANDLE INITIAL CONNECTION ERROR ########################'))
})

// routes
app.get('/', (req, res, next) => {
  res.status(200).send('Hello there, welcome to fundMe api.')
})


// server setup
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`)) 
