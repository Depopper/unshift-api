var mongoose = require('mongoose')
var Schema = mongoose.Schema

function Day(key, options, day, start_at, end_at){
    mongoose.SchemaType.call(this, key, options, 'Day');
    this.start = new Date(start_at)
    this.end = new Date (end_at)
    this.day = day
    this.hours = {}
    for (i = 8; i < 24; i++)
        this.hours[i] = new Hour(i)
    this.toBSON =  function() {
      return {start: this.start, end: this.end, day: this.day, hours: this.hours}
    }
}
Day.prototype = Object.create(mongoose.SchemaType.prototype);
Day.prototype.cast = function(_val) {
      return _val;
    };
mongoose.Schema.Types.Day = Day;

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
    arronds: Number,
    days: [{type: Day}]
})

Hour.prototype.addPlace = function(nb){
    this.totalPlaces += nb
}
Hour.prototype.addUser = function(user_id){
    if (this.nbPick < this.totalPlaces){
        this.users.push(user_id)
        this.nbPick += 1
    }
}

var Week = mongoose.model('Week', weekSchema)

exports.Hour = Hour
exports.Day = Day
exports.Week = Week