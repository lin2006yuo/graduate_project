import * as types from './mutation-types'

function findIndex(list, id) {
    return list.findIndex((item) => {
        return item.id === id
    })
}




//校园公告
export const deleteAnnounce = function ({commit, state}, id) {
    let announceList  = state.announceList.slice()
    let index = findIndex(announceList, id)
    announceList.splice(index, 1)
    commit(types.SET_ANNOUNCE, announceList)
}

export const addAnnounce = function ({commit, state}, announce) {
    let announceList = state.announceList.slice()
    announceList.push(announce)
    commit(types.SET_ANNOUNCE, announceList)
}


//公司
export const deleteCompany = function ({ commit, state }, id) {
    let companyList = state.companyList.slice()
    let index = findIndex(companyList, id)
    companyList.splice(index, 1)
    commit(types.SET_COMPANY, companyList)
    commit(types.ALTER_CTOTALCOUNT, -1)
}

export const addcompany = function ({ commit, state }, company) {
    let companyList = state.companyList.slice()
    companyList.push(company)
    commit(types.SET_COMPANY, companyList)
    commit(types.ALTER_CTOTALCOUNT, 1)
}