import * as types from './mutation-types'
import Vue from 'vue'

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
    },
    [types.SET_CHAT](state, status) {
        state.showChat = status
    },
    [types.SET_LOGIN](state, islogin) {
        state.login = islogin
    },
    [types.SET_ROLE](state, role) {
        state.role = role
    },
    [types.SET_NEW_MESSAGE](state, index) {
        const chator = state.chatlist[index]
        console.log(chator)
        Vue.set(chator, 'dot', true)
    }
}

export default mutations