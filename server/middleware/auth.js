module.exports = function(req, res, next) {
    if(!req.cookies['connect.sid'] && req.path !== '/login'){
        res.json({ code: 1, message: '请登录'})
    } else{
        next()
    }
}