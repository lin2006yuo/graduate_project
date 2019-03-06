import io from 'socket.io-client'

const socket = io('ws://localhost:3000')

socket.on('receiveMsg', function(data) {
    console.log('收到消息：' + data)
})

socket.emit('sendMsg', {name: 'tom', date: Date.now()})
console.log('发送消息：', {name: 'tom', date: Date.now()})