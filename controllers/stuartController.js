const Week = require('../models/week').Week
const Day = require('../models/week').Day
const Moment = require('moment')

create_days = (start, end) => {
    var semaine = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
    var week = []
    for(var i = 0; i < 7; i++)
        week.push(new Day(null, null, semaine[i], start, end))
    return week
}

exports.new_week = (req, res) => {
    start = Moment(req.body.start).add(1,'h')
    end = Moment(req.body.end).add(1,'h')
    days = create_days(start, end)
    test = 0
    if (!start || !end)
        return res.status(400).json({error: start ? "End date error": "Start date error" })
    for(var i = 1; i <= 23; i++)
    res.send('ok')
}

/// un bug trop chelou dans le constructeur de day. Il est dabord instancier avec undefined ????!



exports.get_week = (req, res) => {
    ret = Week.find({})
    start = req.body.start
    end = req.body.end

    if((arrond = req.body.arrond))
        ret.where('arronds', arrond)
    if(start)
        ret.where('start').gte(Moment(start).add(1,'h'))
    if(end)
        ret.where('end').lte(Moment(end).add(1, 'h'))

    ret.exec((err, data) => {
        if(err)
            console.log(err)
        else
            res.json((data))
    })
}