const express    = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var mongoose     = require('mongoose');
const app        = express()
const router     = require('./routes/router')
var db

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost/unshift-api');

router(app)

app.listen(3000)