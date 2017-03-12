const users = require('./r_users')
const stuart = require('./r_stuart')
const Week = require('../models/week').Week
const usersController = require('../controllers/usersController')
const isAuthentificated = require('../middleware/middleware').isAuthentificated

module.exports = (app) => {
    app.use('/users', isAuthentificated, users)
    app.use('/stuart', stuart)
    app.get('/test', (req, res) => {
        Week.findOne({}, (err, data) => {
            console.log(data.days[1].hours)
        })
    })
    app.post('/login', (req, res) => usersController.login(req, res))
    app.post('/create', (req, res) => usersController.create(req, res))
    app.get('/', (req , res) => res.send('loll'))

}