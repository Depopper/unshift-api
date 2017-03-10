const users = require('./users')
const usersController = require('../controllers/usersController')
const isAuthentificated = require('../middleware/middleware').isAuthentificated

module.exports = (app) => {
    app.use('/users', isAuthentificated, users)

    app.post('/login', (req, res) => usersController.login(req, res))
    app.post('/create', (req, res) => usersController.create(req, res))


    app.get('/', (req , res) => res.send('loll'))

}