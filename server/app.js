var createError = require('http-errors');
var express = require('express')
var app = express()
//路由
var admin = require('./routes/admin')
var front = require('./routes/front')
var public = require('./routes/public')

var bodyParser = require('body-parser')
//cookies session 
var session = require('express-session');
//跨域
const cors = require('cors')


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors({
    maxAge: 172800,
    credentials: true, 
    origin: ['http://localhost:8080']
}))

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

// app.use(function (req, res, next) {
//     const prefix = req.originalUrl.match(/\/\w+/)[0]
//     if(prefix === '/public'){
//         next()
//     }else{
//         if (!req.session._id) {
//             res.json({
//                 code: 2,
//                 msg: '没登陆，被拦截'
//             })
//         } else {
//             next()
//         }
//     }
// })

app.use('/admin', admin)
app.use('/front', front)
app.use('/public', public)

// app.use(function (req, res, next) {
//     console.log(req.cookies.id);
    
//     next(createError(404));
// });
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     console.log(req.body);
    
    
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.json({
//         code: 1,
//         msg: '404'
//     })
// });


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log('Example app listening on port 3000!'))