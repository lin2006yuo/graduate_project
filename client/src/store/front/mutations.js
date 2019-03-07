import * as types from './mutation-types'

const mutations = {
    [types.SET_STUDENT](state, student){
        state.student = {...state.student, ...student}
    },
    [types.SET_COMPANY](state, company) {
        state.company = {...state.company, ...company}
    },
    [types.SET_STUDENT_HASJL](state, hasJl){
        state.student.hasJl = hasJl
    },
    [types.DEL_COMPANY](state){
        state.company = {}
    },
    [types.DEL_STUDENT](state){
        state.student = {}
    },
    [types.SET_RESUME](state, resume){
        state.resume = resume
    },
    [types.SET_JL](state, jl) {
        state.jl = jl
    },
    [types.RECEIVE_MSG](state, msg) {
        state.chatMsg.push(msg)
    },
    [types.RECEIVE_MSG_LIST](state, {users, chatMsg}) {
        state.users = users
        state.chatMsg = chatMsg
        state.unReadCound = 0
    }
}

export default mutations