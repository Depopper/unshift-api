const express = require('express')
const users  = express.Router()
const usersController = require('../controllers/usersController')
const isAdmin = require('../middleware/middleware').isAdmin

users.post('/', isAdmin, (req, res) => usersController.index(req, res))
users.post('/new-password', (req, res) => usersController.newPassword(req, res))
users.post('/delete', (req, res) => usersController.delete(req, res))

module.exports = users
