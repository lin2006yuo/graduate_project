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
    [types.LOGINOUT](state) {
        state.chatlist = []
        state.currentChator = {},
        state.message = {},
        state.msglist = []
    },
    [types.SET_RESUME](state, resume){
        state.resume = resume
    },
    [types.SET_JL](state, jl) {
        state.jl = jl
    },
    [types.RECEIVE_MSG](state, msg) {
        state.message = msg
    },
    [types.RECEIVE_CHAT_LIST](state, chatlist) {
        state.chatlist = chatlist
    },
    [types.SET_CURRENT_CHATOR](state, chator) {
        state.currentChator = chator
    },
    [types.SET_MESSAGE_LIST](state, msglist) {
        state.msglist = msglist
    },
    [types.POST_MESSAGE](state, message) {
        state.msglist.push(message)
    }
}

export default mutations