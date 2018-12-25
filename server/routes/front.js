const express = require("express")
const router = express.Router()
const db = require("../db")
const mongoose = require("mongoose")

/*************************学生****************************** */

//修改用户信息
router.post("/updateStudent", function(req, res) {
    const id = mongoose.Types.ObjectId(req.body._id)
    const name = req.body.name
    const sex = req.body.sex
    const birthday = req.body.birthday
    const ethnic = req.body.ethnic
    const city = req.body.city || ["广东", "广州"]
    const academy = req.body.academy
    const grade = req.body.grade
    const major = req.body.major
    const phone =
        req.body.phone === undefined ? undefined : new Number(req.body.phone)
    const QQ =
        req.body.phone === undefined ? undefined : new Number(req.body.QQ)
    const eMail = req.body.eMail
    const hasJl =
        req.body.hasJl === undefined ? false : new Boolean(req.body.hasJl)

    db.studentModel.updateOne(
        { _id: id },
        {
            name,
            sex,
            birthday,
            ethnic,
            city,
            academy,
            grade,
            major,
            phone,
            QQ,
            eMail,
            hasJl
        },
        function(err, doc) {
            if (err) {
                res.json({ code: 1, msg: "修改失败", err: err })
            } else {
                res.json({ code: 0, msg: "修改成功" })
            }
        }
    )
})

//获取简历及对应学生信息
router.get("/getJl", function(req, res) {
    const studentId = mongoose.Types.ObjectId(req.session._id)
    db.jlModel
        .findOne({ studentId: studentId })
        .populate("studentId")
        .exec(function(err, doc) {
            if (err) {
                res.json({ code: 1, msg: "查询失败", err: err })
            } else {
                res.json({ code: 0, msg: "查询成功", data: doc })
            }
        })
})

//创建简历
router.post("/createJl", function(req, res) {
    const studentId = mongoose.Types.ObjectId(req.session._id)
    db.jlModel.create(
        {
            studentId: studentId
        },
        function(err, doc) {
            if (err) {
                res.json({ code: 1, msg: "创建失败", err: err })
            } else {
                res.json({ code: 0, msg: "创建成功", doc: doc })
            }
        }
    )
})

//修改简历
router.post("/updateJl", function(req, res) {
    // edu: { tyep: String },
    // isT: { tyep: Boolean },
    // posi: { tyep: String },
    // rank: { tyep: String },
    // excepCity: { tyep: Array },
    // excepMon: { tyep: String },
    // certificate: { tyep: String },
    // lang: { tyep: Object },
    // textarea: { tyep: String },
    const id = mongoose.Types.ObjectId(req.session._id)
    const edu = req.body.edu
    const isT = new Boolean(req.body.isT)
    const posi = req.body.posi
    const rank = req.body.rank
    const excepCity = new Array(req.body.excepCity)
    const excepMon = req.body.excepMon
    const certificate = req.body.certificate
    const lang = new Object(req.body.lang)
    const textarea = req.body.textarea

    db.jlModel.updateOne(
        { studentId: id },
        {
            edu,
            isT,
            posi,
            rank,
            excepCity,
            excepMon,
            certificate,
            lang,
            textarea
        },
        function(err, doc) {
            if (err) {
                res.json({ code: 1, msg: "修改失败", err: err })
            } else {
                res.json({ code: 0, msg: "修改成功", data: doc })
            }
        }
    )
})

/*********************************公司********************************************* */

//修改公司基本信息
router.post("/updateCompany", function(req, res) {
    const id = mongoose.Types.ObjectId(req.session._id)
    const companyName = req.body.companyName
    const position = req.body.position
    const companyIntro = req.body.companyIntro
    const contact = req.body.contact
    const phone = req.body.phone
    console.log(req.body.position)

    db.companyModel.updateOne(
        { _id: id },
        {
            companyName,
            companyIntro,
            contact,
            phone,
            position
        },
        function(err, doc) {
            if (err) {
                res.json({ code: 1, msg: "更新失败" })
            } else {
                res.json({ code: 0, msg: "更新成功", data: doc })
            }
        }
    )
})

//公司发布招聘信息
router.post("/publishResume", function(req, res) {
    const companyId = mongoose.Types.ObjectId(req.session._id)
    const title = req.body.title
    const category = req.body.category
    const salary = req.body.salary
    const content = req.body.a_content
    db.resumeModel.create(
        {
            companyId,
            title,
            category,
            salary,
            content
        },
        function(err, doc) {
            if (err) {
                res.json({ code: 1, msg: "添加失败" })
            } else {
                res.json({ code: 0, msg: "添加成功", data: doc })
            }
        }
    )
})

//删除招聘信息
router.post("/deleteResume", function(req, res) {
    const _id = mongoose.Types.ObjectId(req.body.recruit_id)
    db.resumeModel.deleteOne(
        {
            _id
        },
        function(err, doc) {
            if (err) {
                res.json({ code: 1, msg: "添加失败" })
            } else {
                res.json({ code: 0, msg: "删除成功" })
            }
        }
    )
})

//根据id获取公司招聘信息
router.get("/getResume", function(req, res) {
    const companyId = mongoose.Types.ObjectId(req.session._id)
    db.resumeModel.find({ companyId: companyId }, function(err, doc) {
        if (err) {
            res.json({ code: 1, msg: "查询失败" })
        } else {
            res.json({ code: 0, msg: "查询成功", data: doc })
        }
    })
})

//通过studen_id获取已投递的简历
router.get("/getResumeById", function(req, res) {
    const studentId = mongoose.Types.ObjectId(req.query.student_id)
    db.com2jlModel.find({ studentId: studentId }, function(err, doc) {
        if (err) {
            res.json({ code: 1, msg: "查询失败" })
        } else {
            res.json({ code: 0, msg: "查询成功", data: doc })
        }
    })
})

//通过公司id获得投递的简历
router.get("/getResumeByCompanyId", function(req, res) {
    const companyId = mongoose.Types.ObjectId(req.query.companyId)
    db.com2jlModel.find({ companyId: companyId }, function(err, doc) {
        if (err) {
            res.json({ code: 1, msg: "查询失败" })
        } else {
            res.json({ code: 0, msg: "查询成功", data: doc })
        }
    })
})

/***********************公司-简历-学生******************************* */

router.post("/submitJl", function(req, res) {
    const jlId = mongoose.Types.ObjectId(req.body.jlId)
    const studentId = mongoose.Types.ObjectId(req.body.studentId)
    const companyId = mongoose.Types.ObjectId(req.body.companyId)
    db.com2jlModel.create(
        {
            jlId,
            studentId,
            companyId
        },
        function(err, doc) {
            if (err) {
                res.json({ code: 1, msg: "提交失败" })
            } else {
                res.json({ code: 0, msg: "提交成功" })
            }
        }
    )
})

router.get("/hasSub", function(req, res) {})

module.exports = router
