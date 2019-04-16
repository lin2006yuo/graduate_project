<template>
    <div class="antitle">
        <div class="ti">
            <el-tooltip class="item" effect="dark" content="返回" placement="top">
                <transition name='fade'>
                    <div class="back"
                        @mouseover="move" 
                        @mouseout="stopmove"
                        v-show="$route.name === 'Page' || 'RecruitPage'"
                        @click="$router.back()"
                    ><i class="el-icon-arrow-left" :class="{iback: backAnima}"></i>
                    </div>
                </transition>
            </el-tooltip>
            <h1 class="title">{{title}}</h1>
            <span class="position" v-if="position.length" >
                <router-link v-for="(item,index) in position" :to="item.route" :key="index">{{item.text}} - </router-link>
            </span>
        </div>
        <div class="line"></div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            backAnima: false
        };
    },
    props: {
        title: {
            type: String,
            default: '校园公告'
        },
        position: {
            type: Array,
            default: function () {
                return ['首页','校园公告']
            }
        }
    },
    computed: {
        pos(){
            let str = ''
            for(let value of this.position){
                str = str + value + '>'
            }
            return str.substr(0,str.length - 1)
        }
    },
    components: {},
    methods: {
        move(){
            this.backAnima = true
        },
        stopmove(){
            this.backAnima = false
        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'
.antitle
    .ti
        clearfix()
        .back
            float left
            margin-top 8px
            padding 0 20px 0 0
            cursor pointer
            i
                font-size 24px
                &.iback
                    color $bg-color
                    animation back 1s ease infinite
        .title
            margin-top 10px
            font-size 16px
            font-weight lighter
            float left
        .position
            margin-top 20px
            float right
            color #999
            height 20px
    .line
        margin 0 auto
        width 100%
        border-bottom  1px dashed #999

@keyframes back 
    0%
        transform translate3d(0px,0,0)
    50%
        transform translate3d(-8px,0,0)
    100%
        transform translate3d(0px,0,0)
</style>
