import * as types from './mutation-types'
import { dataFormat } from '@/common/js/util'



const mutations = {
    [types.SET_USER](state, user){
        state.user = user
    },
    [types.DEL_USER](state) {
        state.user = null
    },

    //校园公告
    [types.SET_ANNOUNCE](state, announceList){
        state.announceList = announceList.filter(m => {
            return m.time = dataFormat(m.time, 'yyyy-MM-dd')
        })
    },
    [types.SET_TOTALCOUNT](state, totalCount){
        state.totalCount = totalCount
    },
    [types.ALTER_TOTALCOUNT](state, num){
        state.totalCount += num
    },

    //公司
    [types.SET_COMPANY](state, companyList) {
        state.companyList = companyList
    },
    [types.SET_CTOTALCOUNT](state, cTotalCount) {
        state.cTotalCount = cTotalCount
    },
    [types.ALTER_CTOTALCOUNT](state, num) {
        state.cTotalCount += num
    },
}





export default mutations