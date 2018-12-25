<template>
    <div class="check">
        <div class="back" @click="back">
            <i class="el-icon-arrow-left"></i>
            <i class="editor el-icon-edit-outline" @click.stop="editorClick"></i>
        </div>
        <div class="title">
            <h1>{{currentAnnounce.title}}</h1>
        </div>
        <div class="main">
            <div class="ql-editor" v-html="currentAnnounce.content">

            </div>
        </div>
        <div class="bottom">
            <p>{{currentAnnounce.publisher}}</p>
            <p>{{currentAnnounce.time}}</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import 'quill/dist/quill.core.css'
export default {
    data() {
        return {
            currentAnnounce: {}
        };
    },
    components: {},
    activated(){
        this.currentAnnounce = this.$route.params.currentAnn
    },
    methods: {
        editorClick(){
            this.$router.push('/admin/index/a-annuce-editor')
        },
        back(){
            this.$router.push('/admin/index/a-annuce')
        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
.check
    padding 20px
    background-color #fff
    .back
        margin 10px 0
        i
            font-size 32px
            cursor pointer
            &.editor
                color $bg-color
                float right
    .title
        margin 20px 0
        h1
            font-size 20px
            text-align center
    .main
        width 100%
    .bottom
        p
            font-size 14px
            color #666
            text-align right 
</style>
