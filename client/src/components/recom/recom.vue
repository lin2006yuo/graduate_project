<template>
    <div class="recom">
        <div class="nav" @click="changeTap">
            <div class="nav-item" data-id="1" :class="{active: activeId == 1}">最新职位</div>
            <div class="nav-item" data-id="2" :class="{active: activeId == 2}">推荐职位</div>
            <span class="more"><router-link to="/index/recruit">更多职位</router-link></span>
        </div>
        <div class="content">
            <div class="wrapper" ref="wrapper">
                <div class="inner-content">
                    <div class="position" v-for="item in 4" :key="item">
                        <div class="logo">
                            <img src="./img/logo.jpg" alt="">
                        </div>
                        <h1 class="title"><router-link to="/index/recruitpage">XXX实习生</router-link></h1>
                        <p class="sub">XXX公司<span class="fenlei">互联网</span></p>
                        <div class="info">
                            <span>100-150/天</span>
                            <span>广州</span>
                        </div>
                    </div>
                </div>
                <div class="inner-content">
                    <div class="position" v-for="item in 4" :key="item">
                        <div class="logo">
                            <img src="./img/logo.jpg" alt="">
                        </div>
                        <h1 class="title"><a href="#">XXX实习生</a></h1>
                        <p class="sub">XXX公司<span class="fenlei">互联网</span></p>
                        <div class="info">
                            <span>100-150/天</span>
                            <span>广州</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            activeId: 1
        };
    },
    components: {},
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
        }    
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
@import '~assets/css/mixin.styl'
.recom
    width 960
    background-color #fafafa
    height 40px
    clearfix()
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
        height 200px
        width 960px
        overflow hidden
        .wrapper
            width 1920px
            transition transform 0.4s ease-in-out
            clearfix()
            .inner-content
                width 960px
                height 200px
                position relative
                clearfix()
                float left
                &:before
                    content ''
                    position absolute
                    left 50%
                    top 0
                    height 200px
                    width 0
                    border-left  1px dashed #eaeaea
                    margin-left -10px
                    z-index 50
                .position
                    float left
                    width 480px
                    height 100px
                    box-sizing border-box
                    border-bottom: dashed 1px #eaeaea;
                    position relative
                    .logo
                        position absolute
                        width 80px
                        height 80px
                        right 0
                        top 50%
                        margin-top -40px
                        img
                            width 100%
                    .title
                        font-size 20px
                        color #333
                        margin 10px 0
                    .sub
                        color $bg-color
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
