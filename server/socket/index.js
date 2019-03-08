const db =  require('../db')
const mongoose = require('mongoose')

module.exports = function(server) {
    const io = require('socket.io')(server)
    io.on('connection', function(socket) {
        socket.on('sendMsg', async function({from, to, content}) {
            const chat_id = [from, to].sort().join('_')
            const create_time = Date.now()
            // const result = await db.chatModel.find({ chat_id })
            // const from_deco = mongoose.Types.ObjectId(from)
            // const to_deco = mongoose.Types.ObjectId(to)
            db.chatModel.updateOne({ chat_id }, { $push: {
                chatlist: {
                    from, to, create_time, content
                }
            }}, function(err, chaMsg) {
                if(err) return console.log(err)
                io.emit('receiveMsg', { from, to, create_time, content })
            })
        })
    })
}