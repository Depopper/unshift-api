var mongoose = require('mongoose')
var Schema = mongoose.Schema

function Day(key, options, day, start_at, end_at){
    mongoose.SchemaType.call(this, key, options, 'Day');
    this.start = start_at
    this.end = end_at
    this.hours = {}
    for (i = 8; i < 24; i++)
        this.hours[i] = new Hour(i)
}

function Hour(start){
    this.start = start
    this.end = start + 1
    this.totalPlaces = 0
    this.nbPick = 0
    this.users = []
}

var weekSchema = Schema({
    start: Date,
    end: Date,
    days: [Day]
})


Day.prototype = Object.create(mongoose.SchemaType.prototype);

Hour.prototype.addPlace = function(nb){
    this.totalPlaces += nb
}
Hour.prototype.addUser = function(user_id){
    if (this.nbPick < this.totalPlaces){
        this.users.push(user_id)
        this.nbPick += 1
    }
}

mongoose.Schema.Types.Day = Day;

var Week = mongoose.model('Week', weekSchema)

exports.Hour = Hour
exports.Day = Day
exports.Week = Week