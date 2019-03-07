import * as types from './mutation-types'
import socket from '@/socket/'
import { getmsglist } from '@/api/front'

//退出登陆时，删除学生和公司信息
// export const delUserInfo = function ({ commit}) {
//     commit(types.DEL_COMPANY)
//     commit(types.DEL_COMPANY)
// }

 function initSocket(commit, userid) {
    socket.on('receiveMsg', function (data) {
        if(userid === data.from || userid === data.to){
            commit(types.RECEIVE_MSG, data)
        }
    })
}

export const getMsgList = async function({commit}, userid) {
    initSocket(commit, userid)
    const { data: result } = await getmsglist()
    if(result.code === 0) {
        const { users, chatMsg } = result.data
        commit(types.RECEIVE_MSG_LIST, {users, chatMsg})
    }
}

export const sendMsg = ({commit}, {from, to, content}) => {
    console.log(from, to, content)
    socket.emit('sendMsg', {from, to, content})
}