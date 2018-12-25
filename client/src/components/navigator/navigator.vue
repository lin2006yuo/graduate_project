<template>
    <div class="navigator">
        <div class="wrapper">
            <h1 class="title">韶关学院</h1>
            <a href="#" class="logo">
                <img src="./img/logo.png" alt="">
            </a>
            <span class="line"></span>
            <h5 class="pp">校园招聘网</h5>
            <ul class="nav-list">
                <li class="item"><router-link to="/index">首页</router-link></li>
                <li class="item"><router-link to="/index/announcement">校园公告</router-link></li>
                <li class="item"><router-link to="/index/recruit">招聘信息</router-link></li>
                <li class="item"><a href="#">简历信息</a></li>
            </ul>
            <div class="avator" :class="{logined: debugIsLogin}">
                <!-- 登陆图标 -->
                <img class="ava" v-show="debugIsLogin" src="./img/avator.jpg" alt="" @mouseover="showbox" @mouseout="cancelbox">
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
        <!-- DEBUG -->
        <div class="debugbtn" @click="toggleLogin">
            点击登陆
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getUserInfo, loginout} from  'api/front'
import {mapMutations,mapActions, mapGetters} from 'vuex'

export default {
    data() {
        return {
            showMinbox: false,
            debugIsLogin: false
        };
    },
    mounted(){
        getUserInfo().then(res => {
           if(res.code === 0){
               this.debugIsLogin = true
               //公司
               if(res.flag){
                   this.setCompany(res.data)
               }
               //学生
               else{
                   this.setStudent(res.data)
               }
           }else{
               return 
           }
        }).catch(err => {
           console.log(err)
        })
    },
    computed:{
        ...mapGetters([
            'companyInfo',
            'studentInfo'
        ])
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
        }),
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
.navigator
    width 100%
    height 60px
    border-bottom 1px solid #eaeaea
    background-color $bg-color
    position relative
    z-index 999
    .debugbtn
        width 50px
        height 30px
        background-color #666
        position fixed
        top 50%
        left 20px
    .wrapper
        width 960px
        margin 0 auto
        position relative
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
                a
                    display block
                    height 100%
                    font-size 16px
                    color: #fff
                &:hover
                    background-color $bg-color-hover
        .avator
            float right 
            height 60px
            text-align center
            padding 5px 0 0
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
