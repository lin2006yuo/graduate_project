const express = require('express')
const router = express.Router()
const db = require('../db')
const mongoose = require('mongoose')
const fs = require('fs')


/**
 * 注册账号
 * 
 */
router.post('/register', function (req, res) {
    const username = req.body.username
    const pwd = req.body.checkPwd
    db.studentModel.create({
        username, pwd
    }, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '注册失败' })
        } else {
            res.json({ code: 0, msg: '注册成功' })
        }
    })
})


//查询是否存在用户名
router.get('/hasUsername', function (req, res) {
    const username = req.query.username
    db.studentModel.findOne({username: username}, function (err ,doc) {
        if (err) {
            res.json({ code: 1, msg: '注册失败' })
        } else if(doc !== null){
            res.json({ code: 1, msg: '用户名已存在'})
        }else{
            res.json({code: 0, msg: '可用', doc: doc})
        }
    })
})


//登陆
router.post('/login', function (req, res) {
    const username = req.body.username
    const pwd = req.body.pwd
    const comLo = req.body.comLo
    //公司账号登陆
    if(comLo){
        db.companyModel.findOne({username: username}, function (err, doc) {
            if (err) {
                res.json({ code: 1, msg: '服务器出错' })
                return
            } else {
                if (!doc) {
                    res.json({ code: 1, msg: '不存在该用户名' })
                    return
                } else {
                    if (pwd != doc.pwd) {
                        res.json({ code: 1, msg: '密码不正确!' })
                        return
                    } else {
                        req.session._id = doc._id
                        req.session.company = true
                        res.json({ code: 0, msg: '登陆成功', data: doc })
                        return
                    }
                }
            }
        })
    }
    // 学生账号登陆
    else
    {
        db.studentModel.findOne({ username: username }, function (err, doc) {
            if (err) {
                res.json({ code: 1, msg: '服务器出错' })
                return
            } else {
                if (!doc) {
                    res.json({ code: 1, msg: '不存在该用户名' })
                    return
                } else {
                    if (pwd != doc.pwd) {
                        res.json({ code: 1, msg: '密码不正确!' })
                        return
                    } else {
                        req.session._id = doc._id
                        req.session.company = false
                        res.json({ code: 0, msg: '登陆成功', data: doc })
                        return
                    }
                }
            }
        })
    }
})


//获取用户信息
router.get('/getUserInfo', function (req, res) {
    const id = mongoose.Types.ObjectId(req.session._id)
    const userflag = req.session.company           // true公司  false学生
    
    
    if (!req.session._id) {
        res.json({
            code: 1,
            msg: '请登陆'
        })
    } else {
        //获取用户信息
        //公司
        if(userflag){
            db.companyModel.findById(id, function (err, doc) {
                if (err) {
                    res.json({ code: 1, msg: '获取用户信息失败' })
                } else {
                    res.json({ code: 0, msg: '获取成功', flag: true, data: doc })
                }
            })
        }else{
            db.studentModel.findById(id, function (err, doc) {
                if (err) {
                    res.json({ code: 1, msg: '获取用户信息失败' })
                } else {
                    res.json({ code: 0, msg: '获取成功', flag:false, data: doc })
                }
            })
        }
    }
})

router.get('/loginout', function (req,res) {
    req.session.destroy(err => {
        if(err){
            res.json({code: 1, msg: '登出失败'})
        }
    })
    //清楚客户端cookie
    res.clearCookie('connect.sid')
    res.json({code: 0, msg: '登出成功'})
})


//获得校园公告
router.get('/getAnnouce', function (req, res) {
    let limit = req.query.limit
    let cur = req.query.cur - 1   //第一页cur=1, 第二页cur=2

    db.AnnounceModel.find({}, null, {
        sort: { '_id': -1 },
        skip: cur * limit,
        limit: parseInt(limit)
    }, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '服务器出错，查询失败' })
        } else {
            res.json({ code: 0, msg: '查询成功', data: doc })
        }
    })
})

//获取校园公告总记录数目
router.get('/getAnnoceCount', function (req, res) {
    db.AnnounceModel.countDocuments({}, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '服务器出错，查询失败' })
        } else {
            res.json({ code: 0, msg: '查询成功', data: doc })
        }
    })
})

//获取省
router.get('/getProvince', function (req, res) {
    const id = req.query.id
    fs.readFile('./static/city.json', 'utf-8', function (err, data) {
        if(err){
            res.json({code: 1, msg: '获取失败', err: err})
        }else{ 
            var dataObj = JSON.parse(data)
            res.json({ code: 0, msg: '获取成功', data: dataObj})
        }
    })
})
/**
 * 获取城市
 * @param id 
 */
router.get('/getCityById', function (req, res) {
    const id = req.query.id
    fs.readFile('./static/city.json', 'utf-8', function (err, data) {
        if(err){
            res.json({code: 1, msg: '获取失败', err: err})
        }else{
            var dataObj = JSON.parse(data).filter(item => {
                return item.id === id
            })
            res.json({ code: 0, msg: '获取成功', data: dataObj})
        }
    })
})

//获取所有公司简历总记录数
router.get('/getResumeCount', function (req, res) {
    let category = !req.query.category || req.query.category === [] ? undefined : req.query.category
    if(!category){
        db.resumeModel.count({}, function (err, doc) {
            if(err){
                res.json({code: 1, msg: 'err'})
            }else{
                res.json({code: 0, msg: 'success', data: doc})
            }
        })
    }else{
        db.resumeModel.find({ category: { $all: category } }).count({}, function (err, doc) {
            if (err) {
                res.json({ code: 1, msg: '服务器出错，查询失败' })
            } else {
                res.json({ code: 0, msg: '查询成功', data: doc })
            }
        })
    }
})


//获取所有公司简历
router.get('/getResume', function (req, res) {
    let limit = req.query.limit
    let cur = req.query.cur - 1   //第一页cur=1, 第二页cur=2

    let category = !req.query.category || req.query.category === [] ? undefined : req.query.category

     //查询所有  
    if (!category){
        db.resumeModel.find({}, null, {
            skip: limit * cur,
            limit: parseInt(limit)
        }).populate('companyId')
            .exec(function (err, doc) {
                if (err) {
                    res.json({ code: 1, msg: '服务器出错，查询失败' })
                } else {
                    res.json({ code: 0, msg: '查询成功', data: doc })
                }
        })
    }else{
        //模糊查询数组
        db.resumeModel.find({ category: { $all: category} }, null, {
            skip: limit * cur,
            limit: parseInt(limit)
        }).populate('companyId')
            .exec(function (err, doc) {
                if (err) {
                    res.json({ code: 1, msg: '服务器出错，查询失败' })
                } else {
                    res.json({ code: 0, msg: '查询成功', data: doc, dataLength: doc.length })
                }
            })  
    }
})

module.exports = router

