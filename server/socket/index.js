module.exports = function(server) {
    const io = require('socket.io')(server) 
    io.on('connection', function(socket) {
         console.log('有连接')
    })
}