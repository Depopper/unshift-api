const mongoose = require('mongoose');
const Schema   = mongoose.Schema


var stuartSchema = new Schema({
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true, unique: true }
})


var Stuart = mongoose.model('Stuart', userSchema)

Stuart.findFirst = function(params, cb) {
    return Stuart.find(params)
    .then((user) => {
        if (!user[0])
            cb(-1)
        return (cb(null, user[0]))
    })
}
module.exports = Stuart