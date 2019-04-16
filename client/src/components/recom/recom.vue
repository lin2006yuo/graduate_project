<template>
    <div class="recom">
        <div class="content">
            <div class="wrapper" ref="wrapper">
                <div class="new-position">
                    <div class="left-warpper">
                        <i class="iconfont el-icon-zhiwei"></i>
                        <h2 class="left-title">最新职位</h2>
                        <p class="intro">最新发布的职位都在这里,获取最新的校招资讯，加入心仪的企业吧！</p>
                        <div class="more">
                            <router-link tag="span" to="/index/recruit">发现更多</router-link>
                        </div>
                    </div>
                    <div class="inner-content">
                        <div @click="turn2page(item)" class="position" v-for="item in resume" :key="item._id">
                            <div class="logo">
                                <img :src="`http://${item.companyId.avatar}`" alt="">
                            </div>
                            <h1 class="title">{{item.title}}</h1>
                            <p class="sub">{{item.companyId.companyName}}</p>
                            <div class="info">
                                <span>{{item.salary}}/天</span>
                                <!-- <span>广州</span> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div  class="re-position">
                    <div v-if="hasLogoin" class="inner-content">     
                        <div  @click="turn2page(item)" class="position" v-for="item in recommendResum" :key="item._id">
                            <div class="logo">
                                <img :src="`http://${item.companyId.avatar}`" alt="">
                            </div>
                            <h1 class="title"><a href="#">{{item.title}}</a></h1>
                            <p class="sub">{{item.companyId.companyName}}</p>
                            <div class="info">
                                <span>{{item.salary}}/天</span>
                            </div>
                        </div>
                    </div>
                    <div v-else class="no-login"><div class="nologin"><button class="login" @click="$router.push('/login')">登陆</button>后查看推荐职位！</div></div>
                    <div class="right-warpper">
                        <i class="iconfont el-icon-zhiwei"></i>
                        <h2 class="left-title">推荐职位</h2>
                        <p class="intro">根据你的专业匹配相关的职位，让你更快的找到心仪的企业！</p>
                        <div class="more">
                            <router-link tag="span" to="/index/recruit">发现更多</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { getTotalResume } from  '@/api/front'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            activeId: 1,
            resume: [],
            recommendResum: [],
            hasLogoin: false
        };
    },
    computed:{
        ...mapGetters([
            'studentInfo'
        ])
    },
    methods: {
        changeTap(e){
            let index = e.target.dataset.id
            let wrapperStyle = this.$refs.wrapper.style
            this.activeId = index  
            if(index == 2){   
                wrapperStyle.transform = `translate3d(-960px,0,0)`
            }else{
               wrapperStyle.transform = `translate3d(0,0,0)`
            }
        },
        turn2page(item){
            this.$router.push({name: 'RecruitPage', params: {
                recruit: item
            }})
        }    
    },
    mounted() {
        getTotalResume().then(res => {
            this.resume = res.data
        })
       setTimeout(() => {
           const academy = this.studentInfo.academy
            if(academy) {
                this.hasLogoin = true
                getTotalResume(academy).then(res => {
                    this.recommendResum = res.data.splice(0,4)
                })
            }
       }, 200);
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
@import '~assets/css/mixin.styl'
.title {
    font-size 32px
}
.recom
    height 100%
    clearfix()
    .nologin
        text-align center
        font-size 20px
        color #555
        margin-top 30px
    .nav
        width 100%
        height 40px
        .nav-item
            display inline-block
            padding 0 18px
            line-height 40px
            color #333
            position relative
            overflow hidden
            cursor pointer
            &:before
                content ''
                position absolute
                width 100%
                height 3px
                left 0
                top 0
                background-color $bg-color
                transform translate3d(0,-100%,0)
                transition transform 0.2s ease-in-out
            &.active
                color $bg-color
                &:before
                    content ''
                    position absolute
                    width 100%
                    height 3px
                    left 0
                    top 0
                    background-color $bg-color
                    transform translate3d(0,0,0)
        .more
            float right
            height 40px
            line-height 40px
            margin-right 20px
            color #666
            a
                &:hover
                    color: $bg-color
    .content
        display flex
        justify-content center
        height 100%
        overflow hidden
        .wrapper
            display flex
            justify-content center
            text-align center
            flex-direction column 
            height 100%
            transition transform 0.4s ease-in-out
            clearfix()
            .new-position
                display flex
                flex-direction row
                .left-warpper 
                    position: relative;
                    width 300px
                    height 300px
                    box-sizing border-box
                    text-align center
                    color: #e46034
                    font-size 32px
                    padding-top 40px
                    background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
                    &:hover{
                        .more {
                            opacity 1
                            span {
                                opacity 1
                                cursor pointer
                                transform translate3d(-50%, -50%, 0)
                            }
                        }
                    }
                    .intro {
                        font-size 14px
                        color: #ec8d6d
                        width 80%
                        margin 0 auto
                    }
                    .el-icon-zhiwei
                        font-size 32px
                        position relative
                        z-index 2
                        margin 20px 0
                        &:after
                            content: ""
                            position absolute
                            width 50px
                            height 50px
                            border-radius 50%
                            background-color #feddcd
                            left -8px
                            top -10px
                            z-index -1
                    .more {
                        position absolute
                        left 0
                        top 0
                        right 0
                        bottom 0
                        background-color rgba(0,0,0,0.6)
                        z-index 5
                        opacity 0
                        transition all .35s
                        span {
                            color: #ddd
                            position absolute
                            top 50%
                            left 50%
                            opacity 0
                            transition all .35s
                            transform translate3d(-50%, -20%, 0)
                        }

                    }
                .inner-content
                    position relative
                    flex-wrap wrap
                    display flex
                    flex 1
                    .position
                        background-color #fff
                        width 300px
                        height 135px
                        box-sizing border-box
                        position relative
                        box-shadow 0 1px 2px 0 rgba(0,0,0,0.2)
                        margin 10px
                        border-radius 2px
                        padding-left 20px
                        text-align left
                        transition transform .35s
                        cursor pointer
                        &:hover 
                            transform translate3d(0,-1px,0)
                            box-shadow 0 1px 8px 0 rgba(0,0,0,0.2)
                        .logo
                            position absolute
                            width 80px
                            height 80px
                            right 0
                            top 0
                            img
                                width 100%
                        .title
                            font-size 20px
                            color #333
                            margin 10px 0
                        .sub
                            color #333
                            .fenlei 
                                color #666
                                margin-left 5px
                        .info
                            color #666
                            margin-top 10px
                            font-size 13px
                            span:nth-child(2)
                                margin-left 10px
                    .last-position
                        font-size 32px
                        width 200px
                        height 50px
                        line-height 50px
                        margin-top: 40px
                        margin-left 50px
                        padding 10px
                        border 2px solid #e46034
                        color: #e46034
            .re-position
                display flex
                margin-top 50px
                .right-warpper
                    position: relative;
                    width 300px
                    height 300px
                    box-sizing border-box
                    text-align center
                    color: #618bcc
                    font-size 32px
                    padding-top 40px
                    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
                    &:hover{
                        .more {
                            opacity 1
                            span {
                                opacity 1
                                cursor pointer
                                transform translate3d(-50%, -50%, 0)
                            }
                        }
                    }
                    .intro {
                        font-size 14px
                        color: #74a2ea
                        width 80%
                        margin 0 auto
                    }
                    .el-icon-zhiwei
                        font-size 32px
                        position relative
                        z-index 2
                        margin 20px 0
                        &:after
                            content: ""
                            position absolute
                            width 50px
                            height 50px
                            border-radius 50%
                            background-color #b8defb
                            left -8px
                            top -10px
                            z-index -1
                    .more {
                        position absolute
                        left 0
                        top 0
                        right 0
                        bottom 0
                        background-color rgba(0,0,0,0.6)
                        z-index 5
                        opacity 0
                        transition all .35s
                        span {
                            color: #ddd
                            position absolute
                            top 50%
                            left 50%
                            opacity 0
                            transition all .35s
                            transform translate3d(-50%, -20%, 0)
                        }

                    }
                .no-login {
                    flex 1
                    display flex
                    align-items center
                    justify-content center
                    .nologin {
                        color #93bdfd
                        .login {
                            margin-right 10px
                            outline none
                            border 2px solid #93bdfd
                            padding 10px
                            background-color #fff
                            color #93bdfd
                            border-radius 2px
                            cursor pointer
                            transition all .35s
                            &:hover {
                                background-color #93bdfd
                                color #fff
                            }
                        }
                    }
                }
                .inner-content
                    position relative
                    flex-wrap wrap
                    display flex
                    flex 1
                    .position
                        background-color #fff
                        width 300px
                        height 135px
                        box-sizing border-box
                        position relative
                        box-shadow 0 1px 2px 0 rgba(0,0,0,0.2)
                        margin 10px
                        border-radius 2px
                        padding-left 20px
                        text-align left
                        transition transform .35s
                        cursor pointer
                        &:hover 
                            transform translate3d(0,-1px,0)
                            box-shadow 0 1px 8px 0 rgba(0,0,0,0.2)
                        .logo
                            position absolute
                            width 80px
                            height 80px
                            right 0
                            top 0
                            img
                                width 100%
                        .title
                            font-size 20px
                            color #333
                            margin 10px 0
                        .sub
                            color #333
                            .fenlei 
                                color #666
                                margin-left 5px
                        .info
                            color #666
                            margin-top 10px
                            font-size 13px
                            span:nth-child(2)
                                margin-left 10px
    
</style>
