<template>
    <div class="bg">
        <div class="center">
            <swiper :imgObject="imgArray" class="l-swiper"></swiper>
            <new-nav :announceList="announceList" class="new-nav"></new-nav>
        </div>
        <recom class="recom-box"></recom>
    </div>
</template>

<script type="text/ecmascript-6">
import Swiper from 'components/swiper/swiper'
import NewNav from 'components/newNav/newNav'
import Recom from 'components/recom/recom'
//api
import {getAnnounce} from 'api/admin/admin'
//vuex
import {mapMutations, mapGetters} from 'vuex'
import { getSwiperPic } from  '@/api/admin/admin'

export default {
    data() {
        return {
            announceList: [],
            imgArray: [
                {img: 'xxx.jpg', text: 'aaa'},
                {img: 'xxx.jpg', text: 'bbb'}
            ],
        };
    },
    mounted(){
        getAnnounce().then(res => {
            if(res.code === 0){
                this.announceList = res.data
            }
        }),
        getSwiperPic().then(res => {
            this.imgArray = res.data
        })
    },
    computed: {
    },
    components: {
        Swiper,
        NewNav,
        Recom
    },
    methods: {
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
.center
    width 100%
    margin auto 0
    clearfix()
    .new-nav
        position absolute
        left 0
        top 0
        z-index 100
        width 32%
        height 750px
    .l-swiper
        width 100%   
        height 750px
.recom-wrapper {
    height 700px
    // background-image url('~@/assets/img/16sucai_P591F2B006_05A.jpg')
    width 100%
    z-index 5
    transform-origin: center top;
    background-repeat no-repeat
    background-size cover
}
</style>
