<template>
        <swiper :options="swiperOption" ref="mySwiper" >
            <!-- slides -->
            <swiper-slide class="swiper-no-swiping" v-for="item in 4" :key="item">
                <div class="slide">
                    <a href="#">
                        <img src="./img/3.png" :alt="item">
                    </a>
                    <p class="text"></p>
                </div>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
            
        </swiper>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data() {
        return {
            swiperOption: {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                },
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
>>> .swiper-pagination-bullet-active
    background-color $bg-color
.slide
    position relative
    img 
        width 100%
        height 100%
    .text
        position absolute
</style>
