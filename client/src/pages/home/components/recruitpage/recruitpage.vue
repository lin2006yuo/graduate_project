<template>
  <div class="recruit-page">
    <div class="top-bg"></div>
    <antitle title="职位招聘" :position="position"></antitle>
    <div class="article" v-if="recruit">
      <div class="top">
        <p class="title">{{recruit.title}}</p>
        <div class="tip">
          <span>{{recruit.salary}}/天</span>|
          <span>本科</span>|
          <span>实习{{recruit.day}}个月</span>
        </div>
        <div class="intro">
          <div>
            <div class="title2">公司介绍:</div>
          </div>
          <div class="intro-item">名称: {{this.recruit.companyId.companyName}}</div>
          <div class="intro-item">简介: {{this.recruit.companyId.companyIntro}}</div>
          <div
            class="intro-item"
          >位置: {{this.recruit.companyId.position[0]}} - {{this.recruit.companyId.position[1]}}</div>
          <div class="intro-item">
            联系方式: {{this.recruit.companyId.contact}} - {{this.recruit.companyId.phone}}
            <span
              style="margin-left: 20px; color: #409EFF; cursor: pointer"
              @click="contact"
            >
              <i class="iconfont el-icon-lianxi"></i>在线联系
            </span>
          </div>
        </div>
        <div class="intro" style="margin-top: 20px">
          <div class="title2">职位要求:</div>
        </div>
        <div class="content" v-html="recruit.content"></div>
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
import { submitJl, getResumeById, createchat, getchatlist } from "api/front";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import * as types from '@/store/front/mutation-types'
export default {
  data() {
    return {
      text: '',
      vhtml: '',
      recruit: "",
      fullscreenLoading: false,
      hasSub: false,
      position: [
        {text: '首页', route: '/index'},
        {text: '招聘信息', route: '/index/recruit'},
      ]
    };
  },
  computed: {
    ...mapGetters(["studentInfo", "companyInfo"]),
    ...mapState({
      jl: state => state.front.jl
    }),
  },
  updated() {
    //查询是否已经投递简历
    const student_id = this.studentInfo._id;
    getResumeById(student_id)
      .then(res => {
        if (res.code === 0) {
          this.hasSub = this.hasSubmit(res.data, this.recruit._id);
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
            jlId: this.jl._id,
            recruitId: this.recruit._id,
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
    async contact() {
      if (!this.studentInfo._id && !this.companyInfo._id) {
        this.$message.error({
          message: "您还未登陆，请登陆"
        });
      } else if (!this.studentInfo._id && this.companyInfo._id) {
        this.$message.warning({message: '企业无法联系企业~'})
      } else {
        this.showChat(true)
        const from = this.studentInfo._id;
        const to = this.recruit.companyId._id;
        const role = "student";
        await createchat({ from, to });
        this.initChatList({ from, role });
        this.getMsgList(this.recruit.companyId);
      }
    },
    hasSubmit(arr, id) {
      return arr.some(v => v.recruitId._id === id && v.status === 1);
    },
    ...mapActions(["initChatList", "getMsgList"]),
    ...mapMutations({
      'showChat': types.SET_CHAT
    })
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl';

.recruit-page {
  border-left: 1px solid #eaeaea;
  border-right: 1px solid #eaeaea;
  width: 960px;
  height: 600px;
  margin: 0 auto 0;
  border-radius: 5px;
  padding: 100px 40px 0;

  .top-bg {
    height: 80px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: center center / cover url('~@/assets/img/bg_1.png');
    z-index: 100;
  }

  .article {
    width: 100%;
    margin-top: 20px;
    padding: 10px 10px;
    font-size: 14px;
    position: relative;
    box-sizing: border-box;

    .top {
      width: 100%;

      .title {
        text-align: center;
        line-height: 50px;
        font-size: 24px;
        border-bottom: 1px solid #ddd;
      }

      .tip {
        padding: 10px 0 10px 10px;
        color: #666;

        span {
          display: inline-block;
          padding: 10px;
          font-size: 15px;
        }
      }

      .intro {
        padding: 0 20px;

        .title2 {
          display: inline-block;
          font-size: 18px;
          color: #8a3c5b;
        }

        .intro-item {
          margin: 5px 0;
        }

        span {
          position: relative;

          &:after {
            content: '', position absolute;
            width: 2px;
            height: 5px;
            background-color: $bg-color;
          }
        }
      }

      .content {
        height: 400px;
        padding: 10px 20px 40px;
      }
    }

    .bottom {
      text-align: center;
    }
  }
}
</style>