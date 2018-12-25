<template>
    <div class="contianer">
        <div class="title">
            <h1>校园|校招后台管理</h1>
        </div>
        <el-form :model="form" :rules="rules" ref="loginForm">
            <el-form-item prop="username">
                <el-input placeholder="请入输入账号" v-model="form.username" @change="onChange"></el-input>
            </el-form-item>
            <el-form-item prop="pwd">
                <el-input placeholder="请入输入密码" v-model="form.pwd" @change="onChange"></el-input>
            </el-form-item>
            <div v-show="errMsg" class="errlogin">
                {{errMsg}}
            </div>
            <el-form-item>
                <el-button class="e-button" type="primary" @click="login">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
import {login} from 'api/admin/admin'
import {mapMutations, mapState} from 'vuex'

export default {
    data() {
        return {
            imageUrl: '',
            dialogVisible: false,
            form: {
                username: '',
                pwd: '',
            },
            rules: {
                username: {required: true, message: '账号不能为空',trigger: 'blur'},
                pwd: {required: true, message: '密码不能为空',trigger: 'blur'},
            },
            errMsg: ''
        };
    },
    components: {},
    computed: {
        ...mapState({
            admin: state => state.admin,
        })
    },
    methods: {
        // handleAvatarSuccess(res,file){
        //     console.log(res,file,URL);  
        //     this.imageUrl = URL.createObjectURL(file.raw);        
        // },
        onChange(){
            this.errMsg = ''
        },
        login(){
           this.$refs.loginForm.validate(value => {
               if(value){
                   login('http://localhost:3000/admin/login', {
                       username: this.form.username,
                       pwd: this.form.pwd
                   }).then(res => {
                       //登陆成功
                       if(res.code === 0){
                           let user = res.data
                           this.setUser(user)
                           this.$router.push('index')
                       }else{
                           this.errMsg = res.msg
                       }
                   }).catch(err => {
                       console.log(err)
                   })
               }else{
                   return
               }
           })
        },
        ...mapMutations({
            setUser: 'SET_USER'
        })
    }
};
</script>

<style scoped lang="stylus">
.contianer
    box-sizing border-box
    position absolute
    top 10%
    left 50%
    margin-left -200px
    height 300px
    width 400px
    background-color #f4f4f4
    border-radius 5px
    padding 20px
    .title
        margin 20px 0
        h1
            text-align center
            font-size 16px
    .e-button
        width 100%
    .errlogin
        text-align center
        color red
        margin-bottom 10px
</style>
