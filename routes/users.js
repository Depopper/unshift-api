const express = require('express')
const users  = express.Router()

users.get('/',(req, res) => {
    console.log('Dans users')
})

users.post('/new',(req, res) => {
    console.log(req.body)
})

module.exports = users
