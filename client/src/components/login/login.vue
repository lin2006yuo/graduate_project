<template>
    <div class="lo">
        <div class="left">
            <div class="loed" v-show="loginBox">
                <div class="nav">
                    <div class="nav-item" data-id="1" :class="{active: curNav == 1}" @click="changeCur(1)">
                        <i class="icon"></i>
                        <span>学生登陆</span>
                    </div>
                    <div class="nav-item" data-id="2" :class="{active: curNav == 2}" @click="changeCur(2)">
                        <i class="icon"></i>
                        <span>企业登陆</span>
                    </div>
                </div>
                <div class="center">
                    <el-form action="" ref="loginForm" class="lo-form" :model="loginForm" :rules="loginRules">
                        <el-form-item prop="username">
                            <el-input prefix-icon="el-icon-l-zhanghao" v-model="loginForm.username" placeholder="请输入账号"></el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <el-input prefix-icon="el-icon-l-mima" v-model="loginForm.pwd" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox class="btn-check" v-model="loginForm.auto">自动登陆</el-checkbox>
                            <el-checkbox v-model="loginForm.comLo">企业登陆</el-checkbox>
                        </el-form-item>
                        <p class="message">{{textMessage}}</p>
                        <el-form-item>
                            <el-button type="primary" class="btn-submit" @click="login">登陆</el-button>
                        </el-form-item>
                    
                    </el-form>
                </div>
            </div>
            <div class="reg" v-show="!loginBox">
                <div class="nav">
                    <div class="nav-item active">
                        <span>快速注册</span>
                    </div>
                </div>
                <div class="center">
                    <el-form action="" class="lo-form" :model="registerForm" :rules="rules" ref="registerForm">
                        <el-form-item prop="username">
                            <el-input prefix-icon="el-icon-zhanghao" v-model="registerForm.username" placeholder="请输入账号"></el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <el-input prefix-icon="el-icon-mima" v-model="registerForm.pwd" placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item prop="checkPwd">
                            <el-input prefix-icon="el-icon-mima" v-model="registerForm.checkPwd" placeholder="再次输入密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="btn-submit" @click="submit">注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="right">
            <span class="intro">{{textIntro}}</span>
            <button class="btn-reg" @click="changeBox">{{textBtn}}</button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { register,login,hasUsername } from 'api/front'

export default {
    data() {
        var validUsername = (rule, value, callback) => {
            hasUsername(value).then(res => {
                if(res.code === 1){
                    callback(new Error('用户名已存在'))
                }else{
                    callback()
                }
            })
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            if (this.registerForm.checkPass !== '') {
                this.$refs.registerForm.validateField('checkPwd');
            }
            callback();
            }
        }
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.pwd) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        }
        return {
            textMessage: '',
            curNav: 1,
            loginBox: true,
            registerForm: {
                username: '',
                pwd: '',
                checkPwd: '',
            },
            loginForm: {
                username: '',
                pwd: '',
                comLo: false,
                auto: ''
            },
            rules: {
                username: [
                    { validator: validUsername, trigger: 'blur' }                    
                ],
                pwd: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPwd: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            },
            loginRules: {
                username: [
                    {required: true,message: '请输入账号', trigger: 'blur'}
                ],
                pwd: [
                    {required: true,message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    components: {
    },
    computed: {
        textIntro(){
            return this.loginBox ? '还没有账号？' : '已有账号，立即登陆！'
        },
        textBtn(){
            return this.loginBox ? '立即注册' : '立即登陆'
        }
    },
    methods: {
        changeCur(index){
            this.curNav = index
            if(index === 2){
                this.loginForm.comLo = true
            }else{
                this.loginForm.comLo = false
            }
        },
        changeBox(){
            this.loginBox = !this.loginBox
        },
        // validUsername(){
        //     hasUsername(this.registerForm.username).then(res => {
        //         if(res.code === 1){

        //         }
        //     }).catch(err => {
        //         console.log(err);
                
        //     })
        // },
        submit(){
           this.$refs.registerForm.validate((valid) => {
               if(valid){
                   register(this.registerForm).then(res => {
                       if(res.code === 0){
                           this.loginBox = true
                       }
                   })
               }else{
                   console.log('err');
                   return 
               }
           })
        },
        login(){
            this.$refs.loginForm.validate((valid) => {
                if(valid){
                    login(this.loginForm).then(res => {
                        if(res.code === 1){
                            this.textMessage = res.msg
                        }else{
                            this.$router.push({name: 'Index'})
                        }
                        
                    }).catch(err => {
                        console.log(err)
                        
                    })
                }else{
                    return
                }
            })
        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
.lo
    box-sizing border-box
    width 100%
    height 350px
    clearfix()
    border 1px solid #eaeaea
    .left
        height 100%
        width 60%
        float left
        border-right 1px solid #eaeaea
        .loed
            .nav
                width 100%
                height 60px
                .nav-item
                    float left
                    width 50%
                    height 100%
                    text-align center
                    line-height 60px
                    background-color #efefef
                    cursor pointer
                    position relative
                    box-sizing border-box
                    &.active
                        background-color #fff
                        border-left 1px solid #ddd
                        border-right 1px solid #ddd
                        &:before
                            content ''
                            position absolute
                            width 100%
                            height 3px
                            background-color $bg-color
                            left 0
                            top 0
                    span
                        font-size 16px
                        color #333
            .center
                padding 30px 60px
                .lo-form
                    .message
                        text-align center
                        color red
                    .btn-submit
                        margin 10px auto
                        display block
                        width 100%
        .reg
            .nav
                width 100%
                height 60px
                .nav-item
                    float left
                    width 100%
                    height 100%
                    text-align center
                    line-height 60px
                    background-color #efefef
                    cursor pointer
                    position relative
                    box-sizing border-box
                    &.active
                        background-color #fff
                        border-left 1px solid #ddd
                        border-right 1px solid #ddd
                        &:before
                            content ''
                            position absolute
                            width 100%
                            height 3px
                            background-color $bg-color
                            left 0
                            top 0
                    span
                        font-size 16px
                        color #333
            .center
                padding 30px 60px
                .lo-form
                    .message
                        text-align center
                        color red
                    .btn-submit
                        margin 10px auto
                        display block
                        width 100%
    .right
        float right
        width 30%
        padding 60px 20px 0
        text-align center
        .intro
            display block
            text-align center
            font-size 24px
            color $bg-color
        .btn-reg
            margin-top 30px
            background-color #fff
            border 1px solid $bg-color
            width 150px
            height 50px
            border-radius 5px
            font-size 16px
            color $bg-color
            cursor pointer
            &:focus
                outline 0
            &:hover
                background-color $bg-color
                color #fff
</style>
