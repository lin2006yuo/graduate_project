import axios from 'axios'
import { promises } from 'fs'
import router from '@/router/index.js'

axios.defaults.withCredentials = true;
axios.interceptors.response.use(res => {
    if(res.data.code === 2){
        router.push({name: 'Login'})
    }
    return res
}, err => {
    console.log(err);
    
})

//登陆请求
export function login(url, param) {
    return axios.post(url, param).then(res => {
        return Promise.resolve(res.data)      
    }).catch(err => {
        return Promise.reject(err)
    })
}

//发布请求
export function publishAnnouce(param) {
    const url = 'http://localhost:3000/admin/addAnnouce'
    return axios.post(url, param).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promises.reject(err)
    })
}

//获得校园公告
export function getAnnounce(cur = 1,limit = 10) {
    const url = 'http://localhost:3000/public/getAnnouce'
    return axios.get(url, {
        params: {
            limit,
            cur
        }
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

//获取校园公告总记录数目
export function getAnnCount() {
    const url = 'http://localhost:3000/public/getAnnoceCount'
    return axios.get(url).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

//更新校园公告
export function updateAnnounce(param) {
    const url = 'http://localhost:3000/admin/updateAnnounce'
    return axios.post(url, param).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

/**
 * 删除公告
 * @param {*} id 
 */
export function deleteAnnounce(id) {
    const url = 'http://localhost:3000/admin/delAnnounce'
    return axios.post(url, {
        id
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}


/**
 * 获取所有公司信息
 * 
 */
export function getAllCompany(limit, cur) {
    const url = "http://localhost:3000/admin/getAllCompany"
    return axios.get(url, {
        params: {
            limit: limit,
            cur
        }
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}
/**
 * 获取所有学生信息
 * 
 */
export function getAllStudent(limit, cur) {
    const url = "http://localhost:3000/admin/getAllStudent"
    return axios.get(url, {
        params: {
            limit: limit,
            cur
        }
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

/**
 * 获取所有公司总记录数
 */
export function getAllCompanyCount() {
    const url = "http://localhost:3000/admin/getAllCompanyCount"
    return axios.get(url).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

/**
 * 增加公司
 */
export function addCompany(form) {
    const url = "http://localhost:3000/admin/addCompany"
    return axios.post(url, form).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

/**
 * 删除公司
 */
export function deleteCompany(id) {
    const url = "http://localhost:3000/admin/deleteCompany"
    return axios.post(url, {
        id
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}
/**
 * 删除学生
 */
export function deleteStudent(id) {
    const url = "http://localhost:3000/admin/deleteStudent"
    return axios.post(url, {
        id
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}
//修改学生密码
export function updateStudentPassword(id, password) {
    const url = "http://localhost:3000/admin/updateStudentPassword"
    return axios.post(url, {
        id, password
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}
//通过名称查询学生
export function getStudentByName(name) {
    const url = "http://localhost:3000/admin/getStudentByName"
    return axios.get(url, {
        params: {
            name
        }
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function getCompanyByName(name = "") {
    const url = "http://localhost:3000/admin/getCompanyByName"
    return axios.get(url, {
        params: {
            name
        }
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}
/**
 * 修改公司
 */
export function updateCompany(params) {
    const url = 'http://localhost:3000/admin/updateCompany'
    return axios.post(url, params).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}


/******************** 轮播图 ******************** */
export function getSwiperPic() {
    const url = 'http://localhost:3000/public/getSwiperPic'
    return axios.get(url).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

export function deletePic(params) {
    const url = 'http://localhost:3000/admin/deletePic'
    return axios.post(url, params).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

// 获取学生数量
export function getStduentCount() {
    const url = 'http://localhost:3000/admin/getStudentCount'
    return axios.get(url).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

// 获取简历分析

export function getJlCount() {
    const url = 'http://localhost:3000/admin/getJlCount'
    return axios.get(url).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}


export function getResume(_id) {
    const url = 'http://localhost:3000/admin/getResume'
    return axios.get(url, {
        params: {
            _id
        }
    }).then(res => {
        return Promise.resolve(res.data)
    }).catch(err => {
        return Promise.reject(err)
    })
}

//获取简历及对应学生信息
export function getJl(studentId) {
    const url = "http://localhost:3000/admin/getJl"
    return axios
      .get(url, {params: {
          _id: studentId
      }})
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(err => {
        return Promise.resolve(err)
      })
  }


  //获取学院简历分析
  export function checkcom2jl() {
    const url = "http://localhost:3000/admin/checkcom2jl"
    return axios
      .post(url)
      .then(res => {
        return Promise.resolve(res.data)
      })
      .catch(err => {
        return Promise.resolve(err)
      })
  }