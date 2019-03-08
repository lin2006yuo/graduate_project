import axios from "axios"

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/******************学生********************* */

// 修改密码
export function mofifyStudentPwd(params) {
  const url = "http://localhost:3000/front/mofifyStudentPwd"
  return axios.post(url, params)
              .then(res => {
                return Promise.resolve(res.data)
              })
              .catch(err => {
                return Promise.reject(err)
              })
}

export function register(params) {
  const url = "http://localhost:3000/public/register"
  return axios
    .post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//查询是否存在用户名
export function hasUsername(username) {
  const url = "http://localhost:3000/public/hasUsername"
  return axios
    .get(url, {
      params: {
        username: username
      }
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export function login(params) {
  const url = "http://localhost:3000/public/login"
  return axios
    .post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export function loginout(form) {
  const url = "http://localhost:3000/public/loginout"
  return axios
    .get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export function getUserInfo() {
  const url = "http://localhost:3000/public/getUserInfo"
  return axios
    .get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//更新学生信息
export function uodateStudentInfo(params) {
  const url = "http://localhost:3000/front/updateStudent"
  return axios
    .post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//获取省
export function getProvince() {
  const url = "http://localhost:3000/public/getProvince"
  return axios
    .get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}
//根据id获取市
export function getCityById(id = 44) {
  const url = "http://localhost:3000/public/getCityById"
  return axios
    .get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export function getTotalResume(arr = [], cur = 1, limit = 10) {
  const url = "http://localhost:3000/public/getResume"
  return axios
    .get(url, {
      params: {
        category: arr,
        limit,
        cur
      }
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//获取招聘信息总记录数
export function getResumeCount(category = []) {
  const url = "http://localhost:3000/public/getResumeCount"
  return axios
    .get(url, {
      params: {
        category
      }
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//更新学生信息
export function updateStudentInfo(form) {
  const url = "http://localhost:3000/front/updateStudent"
  return axios
    .post(url, form)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//获取简历及对应学生信息
export function getJl(studentId) {
  const url = "http://localhost:3000/front/getJl"
  return axios
    .get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.resolve(err)
    })
}

//创建简历
export function createJl(studentId) {
  const url = "http://localhost:3000/front/createJl"
  return axios
    .post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//更新简历
export function updateJl(params) {
  const url = "http://localhost:3000/front/updateJl"
  return axios
    .post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//通过studen_id获取已投递的简历
export function getResumeById(student_id) {
  const url = "http://localhost:3000/front/getResumeById"
  return axios
    .get(url, { params: { student_id } })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      console.err(err)
    })
}

/****************************公司********************************* */

//更新公司基本信息
export function updateCompany(params) {
  const url = "http://localhost:3000/front/updateCompany"
  return axios
    .post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//发布公司招聘信息
export function publishResume(params) {
  const url = "http://localhost:3000/front/publishResume"
  return axios
    .post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//获取公司招聘信息
export function getResume() {
  const url = "http://localhost:3000/front/getResume"
  return axios
    .get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

//删除招聘信息
export function deleteRecruit(recruit_id) {
  const url = "http://localhost:3000/front/deleteResume"
  return axios
    .post(url, { recruit_id })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export function getResumeByCompanyId(companyId, page) {
  const url = "http://localhost:3000/front/getResumeByCompanyId"
  return axios
    .get(url, { params: { companyId, page } })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

/*****************************公司-简历-学生************************************* */
export function submitJl(params) {
  const url = "http://localhost:3000/front/submitJl"
  return axios
    .post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

export function passJl(params) {
  const url = "http://localhost:3000/front/passJl"
  return axios
          .post(url, params)
          .then(res => {
            return Promise.resolve(res.data)
          })
          .catch(err => {
            return Promise.reject(err)
          })
}

export function getmsglist (from, to) {
  const url = 'http://localhost:3000/front/msglist'
  return axios
          .get(url, { params: { from, to }})
          .then(res => {
            return Promise.resolve(res.data)
          })
          .catch(err => {
            return Promise.reject(err)
          })
}

export function getchatlist(from, role) {
  const url = 'http://localhost:3000/front/getchatlist'
  return axios
            .get(url, { params: { from, role }})
            .then(res => {
              return Promise.resolve(res.data)
            })
            .catch(err => {
              return Promise.reject(err)
            })
}

export function createchat({from, to}) {
  const url = 'http://localhost:3000/front/createchat'
  return axios
            .post(url, { from, to })
            .then(res => {
              return Promise.resolve(res.data)
            })
            .catch(err => {
              return Promise.reject(err)
            })
}