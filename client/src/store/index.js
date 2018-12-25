import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin/index'
import front from './front/index'


Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        admin: admin,
        front: front
    }
})

// import Vue from 'Vue'
// import Vuex from 'Vue'
// import * as actions from './actions'
// import * as getters from './getters'
// import state from './state'
// import mutations from './mutations'

// Vue.use(Vuex)

// export const admin = {
//     actions,
//     getters,
//     state,
//     mutations
// }