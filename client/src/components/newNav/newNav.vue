<template>
    <div class="new">
        <p class="title">
            <span class="ti">最新资讯</span>
            <router-link to="/index/announcement" class="more">更多</router-link>
        </p>
        <ul class="new-list">
            <!-- <li class="item">
                <a href="#">
                    <p class="text"><router-link to="/index/page">关于举办2018年离校未就业高校毕业生网上招聘活动的通知</router-link></p>
                    <span class="new">new</span>
                </a>
            </li> -->
            <li class="item" v-for="(item,index) in announceList" :key="index">
                <a href="#">
                    <p class="text">
                        <a @click.prevent="selectItem(item)">{{item.title}}</a>
                        <span><i class="el-icon-time"></i>&nbsp;{{item.time | formate}}</span>
                    </p>
                </a>
            </li>    
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">

export default {
    data() {
        return {};
    },
    props: {
        announceList: {
            type: Array,
            required: true
        }
    },
    filters: {
        formate(time) {
            return new Date(time).toLocaleDateString().replace(/\//g, '-')
        }
    },
    components: {},
    methods: {
        selectItem(item){
            this.$router.push({name: 'Page', params: {
                announce: item
            }})
        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
.new
    width 100%
    height 100%
    box-sizing border-box
    background-color rgba(0,0,0,0.7)
    padding 100px 20px 0
    .title
        font-size 32px
        line-height 40px
        text-indent 8px
        color #ddd
        font-family 'Microsoft JhengHei'
        .more
            float right
            font-size 14px
            color #ddd
            margin-right 5px
            padding 0 10px
            text-indent 0
            background-color rgba(0,0,0,0.2)
            &:hover
                background-color rgba(0,0,0,0.3)
                color #ffd149
    .new-list
        margin-top 20px
        .item
            height 40px
            // background-color rgba(255,255,255,0.5)
            margin 4px 0
            &:hover
                transition: background-color 1.5s;
                background-color #ddd
                a
                    color #000
            a
                display block
                height 40px
                width 100%
                height 100%
                line-height 40px
                color #fff
                .text
                    display flex
                    white-space nowrap
                    overflow:hidden;
                    text-overflow:ellipsis
                    text-indent 10px
                    a
                        flex 1
                    span
                        width 120px
                .new
                    margin-top 7px
                    margin-right 5px
                    border-radius 4px
                    float right
                    width 20px
                    height 10px
                    background-color red
                    font-size 8px
                    line-height 10px
                    color #fff


</style>
