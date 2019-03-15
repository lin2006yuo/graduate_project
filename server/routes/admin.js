const express = require('express')
const router = express.Router()
const db = require('../db')
const mongoose = require('mongoose')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'static/uploads_swiper/')
    },
    filename: function (req, file, cb) {
        const timestamp = Date.now()
      cb(null, timestamp + '.png')
    }
  })
const upload = multer({ storage: storage })


// 登陆请求
router.post('/login', function (req, res) {
    let username = req.body.username
    let pwd = req.body.pwd
    db.adminModel.findOne({username: username}, function (err, doc) {
        if(err){
            res.json({code:1, msg:'服务器出错'}) 
            return
        }else{
            if(!doc){
                res.json({code:1, msg: '不存在该用户名'})
                return
            }else{
                if(pwd != doc.pwd){
                    res.json({code: 1,msg: '密码不正确!'})
                    return 
                }else{
                    res.cookie('id', doc._id, { maxAge: 900000 })
                    res.json({code: 0, msg: '登陆成功',data: doc})
                    return
                }
            }
        }
    })
})

//发布校园公告
router.post('/addAnnouce', function (req, res) {
    let time = new Date().toLocaleString()

    db.AnnounceModel.create({
        title: req.body.title,
        pulisher: req.body.pulisher,
        content: req.body.content,
        time: time
    },function (err, doc) {
        if(err){
            res.json({code: 1, msg: '服务器出错，发布失败'})
        }else{
            res.json({code:0, msg:'发布成功', data: doc })
        }
    })
})


// //获得校园公告
// router.get('/getAnnouce', function (req, res) {
//     let limit = req.query.limit
//     let cur = req.query.cur - 1   //第一页cur=1, 第二页cur=2
    
//     db.AnnounceModel.find({},null,{
//         sort: {'_id': -1},
//         skip: cur * limit,
//         limit: parseInt(limit)
//     },function (err, doc) {
//         if(err){
//             res.json({code: 1, msg: '服务器出错，查询失败'})
//         }else{
//             res.json({code: 0, msg: '查询成功', data:doc})
//         }
//     })
// })

// //获取校园公告总记录数目
// router.get('/getAnnoceCount', function (req, res) {
//     db.AnnounceModel.countDocuments({},function (err, doc) {
//         if (err) {
//             res.json({ code: 1, msg: '服务器出错，查询失败' })
//         } else {
//             res.json({ code: 0, msg: '查询成功', data: doc })
//         }
//     })
// })

//更新校园公告
router.post('/updateAnnounce', function (req, res) {
    const id = mongoose.Types.ObjectId(req.body.id)
    const title = req.body.title
    const content = req.body.content
    const publisher = req.body.publisher
    db.AnnounceModel.updateOne({ _id: id}, {
        title: title,
        content: content,
        pulisher: publisher
    }, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '服务器出错，修改失败' })
        } else {
            res.json({ code: 0, msg: '修改成功', data: doc })
        }
    })
})


//删除校园公告
router.post('/delAnnounce', function (req, res) {
    const id = mongoose.Types.ObjectId(req.body.id)  
    db.AnnounceModel.deleteOne({ _id: id }, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '服务器出错，修改失败' })
        } else {
            res.json({ code: 0, msg: '删除成功', data: doc })
        }
    })
})

/***********************************公司*********************************************** */


/**
 * 获取所有公司
 */
router.get('/getAllCompany', function (req, res) {
    let limit = req.query.limit
    let cur = req.query.cur - 1   //第一页cur=1, 第二页cur=2

    db.companyModel.find({}, null, {
        skip: limit * cur,
        limit: parseInt(limit)
    }, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '服务器出错，查询失败' })
        } else {
            res.json({ code: 0, msg: '查询成功', data: doc })
        }
    })
})

/**
 * 获取所有公司总记录数
 */
router.get('/getAllCompanyCount', function (req, res) {
    db.companyModel.countDocuments({}, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '服务器出错，查询失败' })
        } else {
            res.json({ code: 0, msg: '查询成功', data: doc })
        }
    })
})

//添加公司账号
router.post('/addCompany', function (req, res) {
    const username = req.body.username
    const pwd = req.body.pwd
    const companyName = req.body.companyName

    db.companyModel.create({
        username, pwd, companyName
    }, function (err, doc) {
        if(err){
            res.json({code: 1,msg: '添加失败'})
        }else{
            res.json({ code: 0, msg: '添加成功', data: doc })
        }
    })
})

/**
 * 删除公司
 */
router.post('/deleteCompany', function (req, res) {
    const companyId = mongoose.Types.ObjectId(req.body.id)
    db.companyModel.deleteOne({_id: companyId}, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '删除失败' })
        } else {
            res.json({ code: 0, msg: '删除成功', data: doc })
        }
    })
})

/**
 * 更改公司名称，账号，密码
 */
router.post('/updateCompany', function (req, res) {
    const companyId = mongoose.Types.ObjectId(req.body.id)
    const companyName = req.body.companyName
    const username = req.body.username
    const pwd = req.bopwdame
    db.companyModel.updateOne({ _id: companyId}, {
        companyName,username,pwd
    }, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '修改失败' })
        } else {
            res.json({ code: 0, msg: '修改成功', data: doc })
        }
    })

})


//添加公司简历
router.post('/addResume', function (req, res) {
    const title = req.body.title
    const category = new Array(req.body.category)
    const salary = req.body.salary
    const day = req.body.day
    const content = req.body.content
    const companyId = mongoose.Types.ObjectId(req.body.companyId)
    console.log(title);
    
    db.resumeModel.create({
        title,
        category,
        salary,
        day,
        content,
        companyId,
    }, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '添加失败' })
        } else {
            res.json({ code: 0, msg: '添加成功', data: doc })
        }
    })
    // res.json({msg: 1})
})

/**
 * 删除简历
 * 参数： resumeId
 */
router.post('/deleteResume', function (req, res) {
    const resumeId = mongoose.Types.ObjectId(req.body.id)
    db.resumeModel.deleteOne({ _id:  resumeId}, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '删除失败' })
        } else {
            res.json({ code: 0, msg: '删除成功', data: doc })
        }
    })
})

/**
 * 修改简历
 * 参数：resumeId
 */
router.post('/updateResume', function (req, res) {
    const resumeId = mongoose.Types.ObjectId(req.body._id)
    const title = req.body.title
    const category = new Array(req.body.category)
    const salary = req.body.salary
    const day = req.body.day
    const content = req.body.content
    db.resumeModel.updateOne({_id:resumeId}, {
        title,
        category,
        salary,
        day,
        content
    },function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '修改失败' })
        } else {
            res.json({ code: 0, msg: '修改成功', data: doc })
        }
    })
})

// 根据resumeId查询resume，返回一个resume和company
router.get('/getResumeById', function (req, res) {
    let resumeId = mongoose.Types.ObjectId(req.query.id)
    db.resumeModel.findById(resumeId)
                .populate('companyId')
                .exec(function (err, doc) {
                    if (err) {
                        res.json({ code: 1, msg: '查询失败' })
                    } else {
                        res.json({ code: 0, msg: '查询成功', data: doc })
                    }
                })
})

// 根据公司ID 返回所有resume
router.get('/getAllResume', function (req, res) {
    let companyId = mongoose.Types.ObjectId(req.query.id)
    db.resumeModel.find({companyId}, function (err, doc) {
        if (err) {
            res.json({ code: 1, msg: '添加失败' })
        } else {
            res.json({ code: 0, msg: '查询成功', data: doc })
        } 
    })
})




/****************************** 轮播图 ******************************** */

//添加
router.post('/uploadPic', upload.single('file'),function(req, res) {
    const picUrl = `localhost:3000/uploads_swiper/${req.file.filename}`
    db.swiperPicModel.create({ picUrl }, function(err, doc) {
        if(err) {
            res.json({ type: 1, mgs: '服务器错误' })
        } else {
            res.json({ type: 0, msg: '添加成功', data: doc })
        }
    })
})

//获取
router.get('/getSwiperPic', function(req, res) {
    db.swiperPicModel.find({}, function(err, doc) {
        if(err) {
            res.json({ type: 1, msg: '服务器错误' })
        } else {
            res.json({ type: 0, msg: '获取成功', data: doc })
        }
    })
})

//删除
router.post('/deletePic', function(req, res) {
    const _id = mongoose.Types.ObjectId(req.body._id)
    db.swiperPicModel.deleteOne({ _id }, function(err, doc) {
        if(err) {
            res.json({ code: 1, msg: '服务器错误' })
        } else {
            res.json({ code: 0, msg: '删除成功', data: doc })
        }
    })
})

router.get('/getCompanyCount', function(req, res) {
    db.companyModel.count(function(err, count) {
        res.json({code: 0, data:count})
    })
})

router.get('/getJlCount', async function(req, res) {
    const total = await db.com2jlModel.count()
    const fail = await db.com2jlModel.count({status: 0})
    const succuss = await db.com2jlModel.count({status: 2})
    const undefind = await db.com2jlModel.count({status: 1})
    res.json({code: 0, data: {total, succuss, fail,undefind}})
})


//DEBUG 图片前端操作  然并卵
router.post('/avator',function (req, res) {
    res.json({
        code: 0,
        msg: 'suc'
    })
})





module.exports = router