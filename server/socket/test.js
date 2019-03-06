module.exports = function(server) {
    const io = require('socket.io')(server)
    io.on('connection', function(socket) {
        console.log('socket io connected')
        socket.on('sendMsg', function(data) {
            console.log('服务器收到信息： ',data)
            io.emit('receiveMsg', data.name + '_' + data.date)
            console.log('服务器发送消息: ' + data)
        })
    })
}