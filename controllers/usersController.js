const secret_key = require('../config/config').secret_key
var User = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('json-web-token')


exports.index = (req, res) => {
    User.find({}, (er, data) => {
        if (er)
            console.log(err)
        else
            res.json(data)
    })
}

exports.create = (req, res) => {
        params = permit(req.body, ["email", "password"])
        if(!params.error){
            bcrypt.hash(params.password, 10)
            .then(function(hash) {
                params.password = hash
                new User(params).save((err) => {
                    if (err){
                        for(var key in err.errors)
                            params[key] = err.errors[key].message
                        res.status(400).json(params)
                    }
                    else
                        res.json(params)
                })})}else
                        res.status(400).json(params)
}

exports.login = (req, res) => {
    ret = {}
    email = req.body.email
    password = req.body.password

    User.findFirst({email: email}, function(err, user) {
        if (!user)
        {
            ret._error = 'Identifiants incorrects'
            return res.status(422).json(ret)
        }
        bcrypt.compare(password, user.password, (err, valid) => {
            if (!valid)
            {
                ret._error = "Identifiants incorrects"
                return res.status(422).json(ret)
            }
            else
            {
                payload = {
                    email: user.email,
                    admin: user.admin
                }
                jwt.encode(secret_key, payload, (err, token) => {
                    if (err)
                        res.status(400).json({_error: 'token error!'})
                    else
                        res.json(token)
                })
            }
                
        })
    })
}
var permit = (object, params) =>{
    for(var key in object)
    {
        if(params.indexOf(key) == -1)
        {
            object.error = `invalid params: ${key}`
            return (object)
        }
    }
    return (object)
}