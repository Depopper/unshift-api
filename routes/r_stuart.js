const express = require('express')
const stuart  = express.Router()
const stuartController = require('../controllers/stuartController')
const isAdmin = require('../middleware/middleware').isAdmin

stuart.post('/new_week', stuartController.new_week)
stuart.post('/weeks', stuartController.get_week)

module.exports = stuart
