<template>
    <div class="login">
        <div class="nav">
            <div class="container">
                <h1 class="title">韶关学院</h1>
                    <a href="#" class="logo">
                        <img src="./img/logo.png" alt="">
                    </a>
                    <span class="line"></span>
                <h5 class="pp">校园招聘网</h5>
                <span class="back" @click="back">返回首页</span>
            </div>
        </div>
        <div class="center-container">
            <div class="wrapper">
                <login class="login"></login>
                <img src="./img/tt.png" alt="">
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Login from 'components/login/login'
export default {
    data() {
        return {};
    },
    components: {
        Login
    },
    methods: {
        back(){
            this.$router.push('/')
        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
.login
    .nav
        background-color $bg-color
        .container
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
            .back
                color #fff
                position absolute
                right 0
                bottom 5px
                cursor pointer
                &:hover
                    text-decoration underline
    .center-container
        width 100%
        .wrapper
            width 1160px
            margin 0 auto
            .login
                margin-top 100px
                float left 
                width 70%
            img
                width 30%
                float left
</style>
