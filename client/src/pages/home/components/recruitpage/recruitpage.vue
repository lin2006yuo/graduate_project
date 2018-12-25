<template>
  <div class="recruit-page">
    <antitle></antitle>
    <div
      class="article"
      v-if="recruit"
    >
      <div class="top">
        <p class="title">{{recruit.title}}</p>
        <div class="tip">
          <span>{{recruit.salary}}/天</span>|
          <span>本科</span>|
          <span>实习{{recruit.day}}个月</span>
        </div>
        <div
          class="content"
          v-html="recruit.content"
        >

        </div>
      </div>
      <div class="bottom">
        <el-button
          :disabled="hasSub"
          v-loading.fullscreen.lock="fullscreenLoading"
          type="primary"
          @click="subrec"
        >{{hasSub ? '已投递,请耐心等待:)' : '投递简历'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Antitle from "components/antitle/antitle";
import { submitJl, getResumeById } from "api/front";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      text:
        "西安创知专利事务所成立于2005年，是经国家知识产权局核准注册并授予代理资格的专利代理机构，同时又经西安市工商行政部门核准注册并备案的代理机构。西安创知专利事务所设有专利代理部、业务拓展部、专利咨询检索部、专利培训中心、流程管理部、专利侵权诉讼部、办公室、财务室等多个部门，其代理的专利技术领域覆盖机械、电力电子、通讯、计算机软硬件结合、化工、新材料、生物医药等技术领域。",
      vhtml: `<p>这是段落。</p>
<p>这是段落。</p>
<p>这是段落。</p>

<p>段落元素由 p 标签定义。</p> `,
      recruit: "",
      fullscreenLoading: false,
      hasSub: false
    };
  },
  computed: {
    ...mapGetters(["studentInfo"])
  },
  updated() {
    //查询是否已经投递简历
    const student_id = this.studentInfo._id;
    getResumeById(student_id)
      .then(res => {
        if (res.code === 0) {
          const Jlid = this.recruit._id;
          this.hasSub = this.hasSubmit(res.data, Jlid);
        } else {
          this.$message({
            type: "error",
            message: "服务器出错"
          });
        }
      })
      .catch(err => {
        console.error(err);
      });
  },
  mounted() {
    console.log("mounted");
    if (!this.$route.params.recruit) {
      this.$router.push({ name: "Recruit" });
    }
    this.recruit = this.$route.params.recruit;
  },
  activated() {
    this.recruit = this.$route.params.recruit;
    console.log(this.recruit);
  },
  components: {
    Antitle
  },
  methods: {
    subrec() {
      if (!this.studentInfo._id) {
        this.$message.error({
          message: "您还未登陆，请登陆"
        });
      } else {
        if (!this.studentInfo.hasJl) {
          this.$message.error({
            message: "您还为填写简历，请到个人中心填写简历"
          });
        } else {
          submitJl({
            jlId: this.recruit._id,
            studentId: this.studentInfo._id,
            companyId: this.recruit.companyId._id
          }).then(res => {
            if (res.code === 1) {
              this.$message.error({
                message: "服务器出错，投递失败"
              });
            } else {
              this.hasSub = true;
              this.$message({
                type: "success",
                message: "投递成功，请耐心等待"
              });
            }
          });
        }
      }
    },
    hasSubmit(arr, id) {
      console.log(arr, id);
      return arr.some(v => v.jlId === id);
    }
  }
};
</script>

<style scoped lang="stylus">
.recruit-page
  border-left 1px solid #eaeaea
  border-right 1px solid #eaeaea
  width 960px
  height 600px
  margin 20px auto 0
  border-radius 5px
  padding 10px 40px
  .article
    width 100%
    margin-top 20px
    background-color #fdfdfd
    padding 10px 10px
    font-size 14px
    position relative
    box-sizing border-box
    .top
      width 100%
      .title
        text-align center
        line-height 50px
        font-size 24px
        border-bottom 1px solid #ddd
      .tip
        padding 10px 0 10px 10px
        color #666
        span
          display inline-block
          padding 10px
          font-size 15px
      .content
        padding 10px 20px 40px
    .bottom
      text-align center
</style>