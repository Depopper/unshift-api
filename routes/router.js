const users = require('./users')

module.exports = (app) => {
    app.use('/users', users)
    app.get('/', (req , res) => {
        res.send('loll')
    })

}