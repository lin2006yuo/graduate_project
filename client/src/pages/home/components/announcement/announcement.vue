<template>
    <div class="announcement">
        <div class="top-bg"></div>
        <antitle :position="position"></antitle>
        <ul class="arti-list">
            <li class="item" v-for="(item, index) in announceList" :key="index" >
                <span class="ti" @click="selectItem(item)">{{item.title}}</span>
                <span class="time">{{item.time | timeFormat}}</span>
            </li>
        </ul>
        <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :total="totalCount"
                class="pagi"
                @current-change="curChange">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Antitle from 'components/antitle/antitle'
import {dataFormat} from '@/common/js/util'
//api
import {getAnnounce, getAnnCount} from 'api/admin/admin'
//quil
import 'quill/dist/quill.core.css'


export default {
    data() {
        return {
            announceList: [],
            totalCount: 0,
            position: [
                {text: '首页', route: '/index'},
                {text: '校园公告', route: '/index/announcement'},
            ]
        };
    },
    components: {
        Antitle
    },
    mounted(){
        this._initAnnounce()
    },
    filters: {
        timeFormat(val){
            return dataFormat(val,'yyyy-MMM-dd')
        }
    },
    methods: {
        curChange(cur){
            getAnnounce(cur).then(res => {
                if(res.code === 0){
                    this.announceList = res.data
                }
            })
        },
        selectItem(item){
            this.$router.push({name: 'Page', params: {
                announce: item
            }})
        },
        _initAnnounce(){
            getAnnounce().then(res => {
                if(res.code === 0){
                this.announceList = res.data
            }})
            getAnnCount().then(res => {
                if(res.code === 0){
                    this.totalCount = res.data
                }
            })
        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
.announcement
    width 960px
    height 500px
    margin 0 auto
    padding 100px 40px 0
    background center center / cover url("~@/assets/img/bg_02.jpg") no-repeat
    .top-bg {
        height 80px
        width 100%
        position absolute
        left 0
        top 0
        background center center / cover url("~@/assets/img/bg_1.png")
        z-index 100
    }
    .arti-list
        width 100%
        .item
            height 40px
            margin 5px
            padding 2px 10px
            background-color #fff
            box-shadow 0 0 3px 0px rgba(0,0,0,0.2)
            transition  all .35s
            &:hover
                transform translate3d(0,-1px,0)
                box-shadow 0 1px 5px 0px rgba(0,0,0,0.2)                
                .time
                    color $bg-color-hover
                .ti
                    color $bg-color-hover
            .ti
                width 85%
                line-height 40px
                display inline-block
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                cursor pointer
            .time   
                color #666
                float right
                line-height 40px
    .block
        margin-top 10px
        text-align center
        .pagi
            // background-color 
</style>
