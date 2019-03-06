<template>
    <div class="page">
        <div class="top-bg"></div>
        <antitle></antitle>
        <div class="article">
            <div class="title">{{announce.title}}</div>
            <p class="text ql-editor" v-html="announce.content"></p>
            <div class="bottom">
                <span class="yuan">{{announce.pulisher}}</span>
                <span class="time">{{announce.time | timeFormat}}</span>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Antitle from 'components/antitle/antitle'
import {dataFormat} from '@/common/js/util'
export default {
    data() {
        return {
            // text: '8月29日-31日，校党委副书记胡少平率领校友会相关人员的陪同下，走访了珠海及中山校友。在交流座谈中，胡少平向校友们表示亲切问候，并希望广大校友对拓展学生就业创业、校庆活动能多提建议。整个座谈大家互动交流、气氛热烈，纷纷为学校发展畅所欲言。通过分享了两地校友联络工作的相关经验，胡少平就如何通过资源整合等举措进一步调动校友积极性提出了建议。30日，胡少平等人前往吴熙文校友的花之俏花木培植基地实地参观考察。'
            announce: {},
        }
    },
    activated() {
        this.announce = this.$route.params.announce
    },
    filters: {
        timeFormat(val){
            return dataFormat(val, 'yyyy-MM-dd')
        }
    },
    components: {
        Antitle
    }
};
</script>

<style scoped lang="stylus">
.page
    border-left 1px solid #eaeaea
    border-right  1px solid #eaeaea
    width 960px
    height 100%
    margin 0 auto 0
    border-radius 5px
    padding 10px 40px
    .top-bg {
        height 80px
        width 100%
        position absolute
        left 0
        top 0
        background center center / cover url("~@/assets/img/bg_1.png")
        z-index 100
    }
    .article
        margin-top 40px
        background-color #fdfdfd
        height 500px
        font-size 14px
        position relative
        padding 20px
        .title
            font-size 26px
            text-align center
            margin-bottom 10px
        .text
            line-height 30px
            text-indent 20pt
        .bottom
            position absolute
            right 40px
            bottom 0
            span 
                display block
                font-size 12px
                line-height 20px
                color #666
</style>
