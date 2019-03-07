const db =  require('../db')

module.exports = function(server) {
    const io = require('socket.io')(server)
    io.on('connection', function(socket) {
        socket.on('sendMsg', function({from, to, content}) {
            const chat_id = [from, to].sort().join('_')
            const create_time = Date.now()
            new db.chatModel({from, to, content, chat_id, create_time}).save(function(err, chatMsg) {
                console.log(err)
                io.emit('receiveMsg', chatMsg)
            })
        })
    })
}