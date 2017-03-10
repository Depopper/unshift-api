const jwt = require('json-web-token')
const secret_key = require('../config/config').secret_key


var isAuthentificated = (req, res, next) => {
    token = req.body.token
    jwt.decode(secret_key, token, (err, payload, header) => {
        if (err)
            return res.status(400).json({error: err})
        next()
    })
}

var isAdmin = (req, res, next) => {
    token = req.body.token
    console.log('coucou')
    jwt.decode(secret_key, token, (err, payload, header) => {
        if (err)
            return res.status(400).json({error: err})
        if (!payload.admin)
            return res.status(401).send()
        next()
    })
}

exports.isAuthentificated = isAuthentificated
exports.isAdmin = isAdmin