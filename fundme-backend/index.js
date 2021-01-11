// module imports
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { json } = require('body-parser')

// module configurations


// base constants
const app = express()
const PORT = process.env.PORT || 4000


// middle ware
app.use(json())
app.use(bodyParser.urlencoded({ extended: false }))


// db connections



// routes
app.get('/', (req, res, next) => {
  res.status(200).send('Hello there, welcome to fundMe api.')
})


// server setup
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
