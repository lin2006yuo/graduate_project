<template>
        <swiper :options="swiperOption" ref="mySwiper" >
            <!-- slides -->
            <div class="back"></div>
            <swiper-slide class="swiper-no-swiping" v-for="item in imgObject" :key="item._id">
                <div class="slide">
                    <a href="#">
                        <!-- <img :src="`http://${item.picUrl}`" :alt="item"> -->
                        <div class="img" :style="{backgroundImage: `url(http://${item.picUrl})`}" ></div>
                    </a>
                    <p class="text"></p>
                </div>
            </swiper-slide>
            <!-- Optional controls -->
            <!-- <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div> -->
            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
            
        </swiper>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data() {
        return {
            swiperOption: {
                effect: 'fade',
                mousewheel: true,
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },
                // pagination: {
                //     el: '.swiper-pagination',
                // },
            },
        };
    },
    props: {
        imgObject: {
            type: Array,
            required: true
        }
    },
    components: {
        swiperSlide,
        swiper
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
.back
    // background: linear-gradient(to right, #e55d87, #5fc3e4);
    position absolute
    left 0
    top 0
    right 0
    height 5px
    z-index 200
>>> .swiper-pagination-bullet-active
    background-color $bg-color
.slide
    height 100%
    position relative
    .img 
        width 100%
        height 100%
        background-size cover
        background-repeat no-repeat
    .text
        position absolute
</style>
