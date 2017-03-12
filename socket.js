socket_start = (io) => {
    io.on('connection', (socket) => {
        console.log('Connection de Depopper')
        socket.on('take-shift', (params) => {
            console.log(params)
        })
        socket.on('disconect', () => console.log('Deconnection de ' + socket.handshake.query.username))
    })
}

module.exports = socket_start