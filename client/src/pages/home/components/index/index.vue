<template>
    <div class="">
        <div class="center">
            <new-nav :announceList="announceList" class="new-nav"></new-nav>
            <swiper :imgObject="imgArray" class="l-swiper"></swiper>
        </div>
        <recom class="recom"></recom>
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
    width 960px
    margin 20px auto 0
    clearfix()
    .new-nav
        width 340px
        margin-right 20px
        float left
    .l-swiper
        width 600px
        height 350px
        float right 
.recom
    width 960px
    margin 20px auto 0

</style>
