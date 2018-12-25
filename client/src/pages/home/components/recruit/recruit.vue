<template>
    <div class="recruit">
        <div class="sort">
            <div class="row" :class="{show: isShowMore}">
                <span>所属学院：</span>
                <ul class="list">
                    <li class="item" v-for="item in academy" :key="item" @click="addItem(item)">{{item}}</li>
                </ul>
                <div class="more"><i :class="isShowMore?'el-icon-arrow-up': 'el-icon-arrow-down'" @click="showMore"></i></div>
            </div>
            <div class="row" :class="{show: isShowMore}">
                <span class="choose">已选择</span>
                <div class="choose-box" v-for="(item, index) in choose" :key="index">
                    <span>{{item}}</span>
                    <i class="el-icon-close" @click="deleteItem(index)"></i>
                </div>
            </div>
        </div>
        <div class="main">
            <ul class="main-list">
                <!-- 点击页 -->
                <li class="item" v-for="(item, index) in resume" :key="index">
                    <a @click="turn2page(item)" class="link">
                        <span class="title">{{item.title}}</span>
                        <p class="company"><span>{{item.companyId.companyName}}</span>
                        <span>-{{item.category[0]}}</span><span v-if="item.category[1]">...</span></p>
                        <span class="money">{{item.salary}}/天</span>
                        <span class="day">{{item.day}}个月</span>
                        <img class="logo" src="./img/logo.jpg" alt="">
                    </a>
                </li>
            </ul>
            <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    :total="resumeCount"
                    :page-size="9"
                    @current-change="pageChangeHandle"
                    class="pagi">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getTotalResume, getResumeCount} from 'api/front'
export default {
    data() {
        return {
            resumeCount: 0,
            resume: [],
            academy: [
                '英东生命科学学院','英东农业科学与工程学院','英东食品科学与工程学院','物理与机电工程学院',
                '信息科学与工程学院','文学院','外语学院',
                '化学与环境工程学院','经济管理学院','政治与公共事务管理学院','法学院',
                '数学与统计学院','教育学院','美术与设计学院','音乐学院',
                '旅游与地理学院','土木工程学院',
            ],
            isShowMore: false,
            choose: []
        };
    },
    components: {},
    watch: {
        choose(val){
            getTotalResume(val).then(res => {
                if(res.code === 0){
                    this.resume = res.data
                }
            }),
            getResumeCount(val).then(res => {
                if(res.code === 0){
                    console.log(res.data);
                    
                    this.resumeCount = res.data
                }
        })
        },

    },
    mounted(){
        //init
        getTotalResume([]).then(res => {
            if(res.code === 0){
                this.resume = res.data
            }
        }),
        getResumeCount().then(res => {
            if(res.code === 0){
                console.log(res.data);
                
                this.resumeCount = res.data
            }
        })
    },
    methods: {
        showMore(){
            this.isShowMore = !this.isShowMore
        },
        addItem(item){
            if(this.choose.includes(item)){
                this.isShowMore = false
                return
            }
            this.choose.push(item)
            this.isShowMore = false
        },
        deleteItem(index){
            console.log(index);
            this.choose.splice(index,1)
        },
        pageChangeHandle(index){
            getTotalResume(this.choose,index).then(res => {
                if(res.code === 0){
                    this.resume = res.data
                }
            })
        },
        turn2page(item){
            this.$router.push({name: 'RecruitPage', params: {
                recruit: item
            }})
        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
@import '~assets/css/mixin.styl'
.recruit
    width 960px
    margin 20px auto 0
    .sort
        .row
            height 30px
            line-height 30px
            clearfix()
            border-bottom 1px solid #eaeaea
            position relative
            overflow hidden
            &.show
                overflow visible
            span
                float left
                font-weight bold
                margin-right 100px
                &.choose
                    font-size 14px 
                    font-weight normal
                    color $bg-color
            .choose-box
                display inline-block
                background-color $bg-color-light
                margin-right 10px
                line-height 20px
                // vertical-align 5
                padding 0 5px
                border-radius 3px
                span
                    margin-right 10px
                i
                    cursor pointer
                    color $bg-color
                    &:hover
                        color $bg-color-hover
            .list
                width 750px
                float left
                position absolute
                z-index 100
                left 130px
                border-left 1px solid #eaeaea
                border-right 1px solid #eaeaea
                border-bottom 1px solid #eaeaea
                border-radius 5px
                padding 0 10px
                background-color #fff
                clearfix()
                .item
                    box-sizing border-box
                    width 150px
                    height 30px
                    float left
                    cursor pointer
                    background-color #fff
                    &:hover
                        color $bg-color
            .more
                position absolute
                width 30px
                height 30px
                right 20px
                bottom 0px
                font-size 20px
                font-weight bold
                cursor pointer
                &:hover
                    color $bg-color
    .main
        margin-top 30px
        padding 0 20px
        .main-list
            width 930px
            height 390px
            clearfix()
            .item
                .link
                    display block
                box-sizing border-box
                padding 15px 5px
                margin-left 10px
                width 300px
                float left
                margin-bottom 20px
                background-color #f4f4f4
                position relative
                border-radius 5px
                cursor pointer
                &:hover
                    box-shadow 0 1px 3px 0 rgba(0,0,0,0.2)
                .title
                    font-size 16px
                    color #333
                    line-height 32px
                .company
                    line-height 24px
                    color #666
                    span:nth-child(1)
                        color $bg-color
                .money
                    line-height 24px
                    font-size 14px
                    color #666
                .day
                    color #666
                .logo
                    width 60px
                    height 60px
                    position absolute
                    right 10px
                    top 15%
                    border-radius 5px
        .block
            margin-top 10px
            text-align center

</style>
