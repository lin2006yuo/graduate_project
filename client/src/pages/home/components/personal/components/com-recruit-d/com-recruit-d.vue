<template>
  <div class="recruit-d">
    <div class="top">
      <div class="back"><i
          class="el-icon-arrow-left"
          @click="$router.back()"
        ></i></div>
    </div>
    <div class="main">
      <h1 class="title">{{resumeDetail.title}}</h1>
      <p class="p1"><span>学院：</span><span
          v-for="(v, i) in resumeDetail.category"
          :key="i"
        >{{v}}</span></p>
      <p class="p1"><span>薪资：</span> {{resumeDetail.salary}}/天</p>
      <p class="p1"><span>实习时间：</span> {{resumeDetail.day}}个月</p>
      <div class="textarea">
        <span>职位要求：</span>
        <div
          class="ql-editor"
          v-html="resumeDetail.content"
        ></div>
      </div>
      <div class="block">
        <el-button type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "quill/dist/quill.core.css";
export default {
  data() {
    return {
      resumeDetail: {}
    };
  },
  mounted() {
    this.resumeDetail = this.$route.params.item;
  },
  components: {}
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'

.recruit-d
  .top
    padding 10px 0
    border-bottom 1px solid #eaeaea
    .back
      font-size 30px
      color #ab4d72
      i
        cursor pointer
  .main
    padding 10px
    .title
      font-size 24px
      margin-bottom 20px
      text-align center
    .p1
      margin 5px 0
      font-size 16px
      span
        margin-right 20px
        font-size 14px
        color #666
    .textarea
      height 300px
      // border 1px solid #eeeeee
      border-radius 5px
      margin-bottom 10px
      display flex
      .ql-editor 
        padding 0
        border 1px solid #eee
        width 500px
        padding 5px
    .block
      width 100%
      text-align center
</style>
