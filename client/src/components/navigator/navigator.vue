<template>
    <div class="navigator">
        <div class="shadow">

        </div>
        <div class="wrapper">
            <div class="logo-box">
                <h1 class="title">韶关学院</h1>
                <a href="#" class="logo">
                    <img src="./img/logo.png" alt="">
                </a>
                <span class="line"></span>
                <h5 class="pp">校园招聘网</h5>
            </div>
            <div class="nav-box">
                <ul class="nav-list">
                    <li class="item"><router-link to="/index">首页</router-link></li>
                    <li class="item"><router-link to="/index/announcement">校园公告</router-link></li>
                    <li class="item"><router-link to="/index/recruit">招聘信息</router-link></li>
                    <!-- <li class="item"><a href="#">简历信息</a></li> -->
                </ul>
                <div class="avator" :class="{logined: debugIsLogin}">
                    <!-- 登陆图标 -->
                    <img class="ava" v-show="debugIsLogin" :src="avatarUrl" alt="" @mouseover="showbox" @mouseout="cancelbox">
                    <!-- 未登录图标 -->
                    <img v-show="!debugIsLogin" src="./img/unlogin-avator.jpg" alt="" @click="login">
                    <p class="disc" v-show="!debugIsLogin">您还未登陆，请登陆</p>
                </div>
                <transition name="height">
                    <div class="minbox" v-show="showMinbox" @mouseover="showbox" @mouseout="cancelbox">
                        <a @click.prevent="personalClick">个人中心</a>
                        <a @click.prevent="loginout">退出</a>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getUserInfo, loginout, getJl} from  'api/front'
import {mapMutations,mapActions, mapGetters} from 'vuex'
import * as types from "@/store/front/mutation-types"

export default {
    data() {
        return {
            showMinbox: false,
            debugIsLogin: false,
            isCompany: ''
        };
    },
    mounted(){
        getUserInfo().then(res => {
           if(res.code === 0){
               this.debugIsLogin = true
               //公司
               if(res.flag){
                   this.setCompany(res.data)
                    this.isCompany = true                   
               }
               //学生
               else{
                   this.isCompany = false 
                   this.setStudent(res.data)
                   getJl(res.data._id).then(res => {
                       if(res.code === 0) {
                           this.setJl(res.data)
                       }else {
                           return new Error('查询不到')
                       }
                   })
               }
           }else{
               return 
           }
        }).then(studentId => {
            
        })
        .catch(err => {
           console.log(err)
        })
    },
    computed:{
        ...mapGetters([
            'companyInfo',
            'studentInfo'
        ]),
        avatarUrl() {
            const Regx = /data:image/i
            const info = this.isCompany ? this.companyInfo : this.studentInfo
            return Regx.test(info.avatar) ?  info.avatar : `http://${info.avatar}`
        }
    },
    components: {},
    methods: {
        showbox(){
            this.showMinbox = true
        },
        cancelbox(){
            this.showMinbox = false
        },
        toggleLogin(){
            this.debugIsLogin = !this.debugIsLogin
        },
        login(){
            this.$router.push('/login')
        },
        loginout(){
            loginout().then(res => {
                if(res.code === 0){
                    this.debugIsLogin = false
                    this.$router.push({name: 'Login'})
                    //清空vuex
                    this.delStudent()
                    this.delCompany()
                    this.logout()
                }
            }).catch(err => {
                console.log(err);
            })
        },
        personalClick(){
            // console.log(this.companyInfo);
            // console.log(this.studentInfo);
            if(this.studentInfo.username){
                this.$router.push({name: 'Mine'})
            }else{
                this.$router.push({name: 'ComMine'})
            }
        },
        ...mapMutations({
            setStudent: 'SET_STUDENT',
            setCompany: 'SET_COMPANY',
            delStudent: 'DEL_STUDENT',
            delCompany: 'DEL_COMPANY',
            setJl: 'SET_JL',
            logout: types.LOGINOUT
        }),
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
.navigator
    width 100%
    height 60px
    padding 10px 0
    position absolute
    z-index 999
    .shadow 
        position absolute
        left 
        top 0
        width 100%
        box-shadow: 0 10px 50px 50px rgba(0,0,0,0.4);
    .wrapper
        width 100%
        margin 0 auto
        position relative
        .logo-box 
            position absolute
            left 30px
            top 0
        .nav-box
            position absolute
            right 350px
        .title
            width 104px
            display inline-block
            line-height 60px
            font-size:26px
            font-weight bold
            display none
        .logo
            display inline-block
            line-height 60px
            height 60px
            width 150px
            vertical-align top
            img 
                width 100%
        .line
            display inline-block
            width 1px
            height 40px
            background-color #fff
            line-height 60px
            margin 10px 10px 0
            vertical-align top
        .pp
            display inline-block
            font-size 20px
            font-weight normal
            vertical-align top
            margin-top 15px
            color #fff
        .nav-list
            display inline-block
            height 60px
            line-height 60px
            margin-left 80px
            .item
                float left
                padding 0 16px
                height 60px
                opacity 0.7
                transition opacity .4s
                a
                    display block
                    height 100%
                    font-size 16px
                    color: #fff
                    opacity 1
                &:hover
                    opacity 1
                    background-color rgba(0,0,0,0.5)
        .avator
            float right 
            height 60px
            text-align center
            padding 5px 0 0
            margin-left 80px
            &.logined
                padding-top 10px
            img 
                border-radius 50%
                width 35px
                cursor pointer
                &.ava
                    border 2px solid #eaeaea
            .disc
                padding-top 3px
                color #fff
        .height-enter-active, .height-leave-active
            transition all .4s ease 
        .height-enter,.height-leave-to
            opacity 0
        .minbox
            // overflow hidden
            position absolute
            right 0
            top 65px
            width 100px
            height 60px
            background-color #fff
            border 1px solid #eaeaea
            border-radius 5px
            z-index 9999
            &:before
                content: ''
                position absolute
                height 15px
                width 15px
                background-color #fff
                border 1px solid #eaeaea
                border-right 1px solid transparent
                border-bottom 1px solid transparent
                right 14px
                top -9px
                transform rotateX(0deg) rotateY(45deg) rotateZ(45deg);
            a
                display block
                line-height 30px
                text-align center
                cursor pointer
                width 100%
                height 30px
                position relative
                z-index 5
                &:hover
                    background-color #f5f5f5
                    color $bg-color
            // &.show
            //     display block
            //     height 60px
            



                



</style>
