const express = require('express')
const users  = express.Router()
const usersController = require('../controllers/usersController')

users.get('/',(req, res) => usersController.index(req, res))

users.post('/create',(req, res) => usersController.create(req, res))

users.post('/login', (req, res) => usersController.login(req,res)) 

module.exports = users
