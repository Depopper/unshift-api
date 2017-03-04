const express = require('express')
const bodyParser = require('body-parser')
const app     = express()
const router = (require('./routes/router'))

app.use(bodyParser.urlencoded({extended: false}))
router(app)

app.listen(3000)