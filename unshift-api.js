const bodyParser   = require('body-parser')
const mongoose     = require('mongoose');
const app          = require('express')()
const http         = require('http').Server(app);
const io           = require('socket.io')(http);
const cors         = require('cors')

const router       = require('./routes/router')
const socket_start = require('./socket')



app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost/unshift-api');

router(app)
socket_start(io)

http.listen(3000)