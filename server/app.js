var createError = require('http-errors');
var express = require('express')
var app = express()
var path = require("path")
//路由
var admin = require('./routes/admin')
var front = require('./routes/front')
var public = require('./routes/public')

var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
//cookies session 
var session = require('express-session');
//跨域
const cors = require('cors')


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'static')))
app.use(cors({
    maxAge: 172800,
    credentials: true, 
    origin: ['http://localhost:8080']
}))
app.use(cookieParser())

//cookie session


app.use(session({
    secret: 'secret', // 对session id 相关的cookie 进行签名
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
        maxAge: 1000 * 60 * 60, // 设置 session 的有效时间，单位毫秒
        httpOnly: false
    },
}));



app.use('/admin', admin)
app.use('/front', front)
app.use('/public', public)


module.exports = app