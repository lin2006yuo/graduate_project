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

 function initSocket(commit, userid) {
    socket.on('receiveMsg', function (data) {
        // if(data.to !== userid) return 
        commit(types.RECEIVE_MSG, data)
    })
}

export const initChatList = async ({commit}, {from, role}) => {
    initSocket(commit,from)
    const { data: result } = await getchatlist(from, role)
    commit(types.RECEIVE_CHAT_LIST, result)
    
}

export const sendMsg = ({commit}, {from, to, content, message}) => {
    socket.emit('sendMsg', {from, to, content})
    commit(types.POST_MESSAGE, message)
}

export const getMsgList = ({commit, state}, info) => {
    commit(types.SET_CURRENT_CHATOR, info)
    const from = state.student._id ? state.student._id : state.company._id
    const to = info._id
    return getmsglist(from, to).then(res => {
        const { chatlist } = res.data
        chatlist.forEach(msg => {
            const userid = state.student._id || state.company._id
            msg.id = msg.from === userid ? 0 : 1
            msg.create_time = moment(res.create_time).format("HH:mm:ss")
            msg.contents = msg.content
            msg.author = msg.from === state.student._id ? state.student.name : state.currentChator.companyName
            // msg.imageUrl = msg.from === state.student._id ? 'http://' + state.student.avatar : 'http://' + state.currentChator.avatar
        })
        commit(types.SET_MESSAGE_LIST, chatlist)
    })
}