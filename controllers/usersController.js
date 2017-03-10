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

exports.newPassword = (req, res) => {
    token = req.body.token
    oldPassword = req.body.oldPassword
    password = req.body.password
    passwordConfirmation = req.body.passwordConfirmation
    
    jwt.decode(secret_key, token, function (err, decodedPayload, decodedHeader) {
        if (err) {
            console.error(err.name, err.message);
            return res.status(400).json("erreur 1")
        }
        User.findFirst({email: decodedPayload.email}, (err, user) => {
            console.log(decodedPayload)
            if (!user)
                return res.status(400).json("erreur 2")
            bcrypt.compare(oldPassword, user.password, (err, valid) => {
                if(!valid)
                    return res.status(400).json("erreur 3")
                if (password != passwordConfirmation)
                    return res.status(400).json("erreur 4")
                bcrypt.hash(password, 10, (err, hash) => {
                    console.log(hash)
                    user.password = hash
                    user.save((err) => {
                        if (err)
                            return res.status(400).json(err)
                        else
                            return res.json("All is good")
                     })
                })
            })
        })
    });
}

exports.delete = (req, res) => {
    var _id = req.body.id
    if (_id == "" || _id == undefined || !_id)
        return res.status(400).json({error: "id invalid"})
    User.findByIdAndRemove(_id, (err, user) => {
        console.log(`erreur: ${err}`)
        console.log(`user: ${user}`)
        if(!err)
        res.json({status: 'OK'})
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