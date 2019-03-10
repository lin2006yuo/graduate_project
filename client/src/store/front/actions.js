import * as types from './mutation-types'
import socket from '@/socket/'
import { getchatlist, getmsglist } from '@/api/front'
import { companyInfo } from './getters';
import moment from 'moment'

//退出登陆时，删除学生和公司信息
// export const delUserInfo = function ({ commit}) {
//     commit(types.DEL_COMPANY)
//     commit(types.DEL_COMPANY)
// }

 function initSocket(commit,state, userid) {
    socket.on('receiveMsg', function (msg) {
        console.log(msg)
        // if(data.to !== userid) return 
        const userid = state.student._id || state.company._id
        msg.id = msg.from === userid ? 0 : 1
        msg.date = moment(msg.create_time).format("HH:mm:ss")
        msg.contents = msg.content
        msg.author = msg.from === state.student._id ? state.student.name : state.currentChator.companyName
        commit(types.RECEIVE_MSG, msg)
        commit(types.POST_MESSAGE, msg)
    })
}

export const initChatList = async ({commit, state}, {from, role}) => {
    initSocket(commit,state,from)
    const { data: result } = await getchatlist(from, role)
    commit(types.RECEIVE_CHAT_LIST, result)
    
}

export const sendMsg = ({commit}, {from, to, content, message}) => {
    socket.emit('sendMsg', {from, to, content})
}

export const getMsgList = ({commit, state}, info) => {
    commit(types.SET_CURRENT_CHATOR, info)
    const from = state.student._id ? state.student._id : state.company._id
    const to = info._id
    return getmsglist(from, to).then(res => {
        const { chatlist } = res.data
        chatlist.forEach(msg => {
            console.log(msg.create_time)
            const userid = state.student._id || state.company._id
            msg.id = msg.from === userid ? 0 : 1
            msg.date = moment(msg.create_time).format("HH:mm:ss")
            msg.contents = msg.content
            msg.author = msg.from === state.student._id ? state.student.name : state.currentChator.companyName
            // msg.imageUrl = msg.from === state.student._id ? 'http://' + state.student.avatar : 'http://' + state.currentChator.avatar
        })
        commit(types.SET_MESSAGE_LIST, chatlist)
    })
}