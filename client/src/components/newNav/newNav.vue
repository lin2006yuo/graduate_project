<template>
    <div class="new">
        <ul class="new-list">
            <p class="title">
                <span class="ti">校园公告</span>
                <router-link to="/index/announcement" class="more">更多</router-link>
            </p>
            <span class="line"></span>
            <!-- <li class="item">
                <a href="#">
                    <p class="text"><router-link to="/index/page">关于举办2018年离校未就业高校毕业生网上招聘活动的通知</router-link></p>
                    <span class="new">new</span>
                </a>
            </li> -->
            <li class="item" v-for="(item,index) in announceList" :key="index">
                <a href="#">
                    <p class="text"><a @click.prevent="selectItem(item)">{{item.title}}</a></p>
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
    .new-list
        background-color #fafafa
        .title
            font-size 16px
            line-height 40px
            text-indent 8px
            color #666
            .more
                float right
                font-size 10px
                color #999
                margin-right 5px
                &:hover
                    color $bg-color
        .line
            display block
            width 100%
            height 3px
            background-color $bg-color
            margin-bottom 10px
        .item
            height 30px
            border-bottom 1px solid #f5f5f5
            &:hover
                a
                    color $bg-color
            a
                display block
                width 100%
                height 100%
                line-height 25px
                .text
                    display inline-block
                    width 80%
                    white-space nowrap
                    overflow:hidden;
                    text-overflow:ellipsis
                    text-indent 10px
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
