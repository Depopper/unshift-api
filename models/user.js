const mongoose = require('mongoose');
const Schema   = mongoose.Schema


var userSchema = new Schema({
    name: String, 
    lastname: String,
    password: { type: String, required: true, unique: true },
    admin: {type: Boolean, default: false},
    location: Number,
    phone_number: String,
    email: {type: String, required: true},
    created_at: {type: String, default: new Date},
    updated_at: {type: String, default: new Date}
})

userSchema.pre('save', function(next){
    next()
})

var User = mongoose.model('User', userSchema)

User.findFirst = function(params, cb) {
    return User.find(params)
    .then((user) => {
        if (!user[0])
            cb(-1)
        return (cb(null, user[0]))
    })
}
module.exports = User