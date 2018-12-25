<template>
    <div class="announcement">
        <antitle></antitle>
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
    border-left 1px solid #eaeaea
    border-right  1px solid #eaeaea
    width 960px
    height 500px
    margin 20px auto 0
    border-radius 5px
    padding 10px 40px
    .arti-list
        height 0
        padding-bottom 410px
        width 100%
        .item
            height 40px
            border-bottom 1px dashed #ddd
            &:hover
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
