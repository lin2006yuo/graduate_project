<template>
  <div class="com-cv">
    <div
      class="inner-cv"
      :class="{move: showDetail}"
    >
      <div class="inner-box">
        <div class="title">
          <span class="line"></span>
          <h1>简历管理</h1>
        </div>
        <div class="main">
          <el-table
            class="c-table"
            :data="tableData"
            style="width: 100%"
          >
            <el-table-column
              prop="name"
              label="姓名"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="academy"
              label="学院"
              width="250"
            >
            </el-table-column>
            <el-table-column
              prop="recruit"
              label="应聘信息"
            >
            </el-table-column>
            <el-table-column
              prop="crud"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="showDetailHandle"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="50"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="inner-box-detail">
        <div class="d-top">
          <div class="back">
            <el-tooltip
              class="item"
              effect="dark"
              content="返回"
              placement="top"
            >
              <i
                class="el-icon-arrow-left"
                @click="showDetail = false"
              ></i>
            </el-tooltip>
          </div>
        </div>
        <div class="d-main">
          <h1 class="d-title">XXX公司招聘aa实习生</h1>
          <p class="p1">
            <span>姓名：<small>{{userData.name}}</small></span>
            <span>性别：<small>{{userData.sex}}</small></span>
            <span>民族：<small>{{userData.national}}</small></span>
            <span>出生年月：<small>{{userData.birthday}}</small></span>
          </p>
          <p class="p1">
            <span>现居地：<small>{{userData.city}}</small></span>
            <span>电话号码：<small>{{userData.phone}}</small></span>
            <span>QQ：<small>{{userData.qq}}</small></span>
            <span>邮箱：<small>{{userData.mail}}</small></span>
          </p>
          <p class="p1">
            <span>学历：<small>{{userData.edu}}</small></span>
            <span>专业：<small>{{userData.profes}}</small></span>
            <span>是否学生干部：<small>{{userData.isT}}</small></span>
            <span>职位：<small>{{userData.posi}}</small></span>
            <span>成绩排名：<small>{{userData.rank}}</small></span>
          </p>
          <p class="p1">
            <span>期待工作地：<small>{{userData.excepCity}}</small></span>
            <span>期待薪酬：<small>{{userData.excepMon}}</small></span>
          </p>
          <p class="p1">
            <span>技能证书：<small>{{userData.certificate}}</small></span>
            <span>语言技能：<small>{{userData.lang}}</small></span>
          </p>
          <div class="textarea">
            <div class="p-title">技能专业描述</div>
            <div class="text">
              dsadsads
            </div>
          </div>
        </div>
        <div class="d-bottom">
          <el-button type="primary">通过</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getResumeByCompanyId } from "@/api/front";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [
        {
          academy: "信息科学与工程学院",
          name: "王小虎",
          recruit: "XXX公司招聘aa实习生"
        },
        {
          academy: "信息科学与工程学院",
          name: "王小虎",
          recruit: "XXX公司招聘aa实习生"
        },
        {
          academy: "信息科学与工程学院",
          name: "王小虎",
          recruit: "XXX公司招聘aa实习生"
        },
        {
          academy: "数统学院",
          name: "王小虎",
          recruit: "XXX公司招聘aa实习生"
        },
        {
          academy: "数统学院",
          name: "王小虎",
          recruit: "XXX公司招聘aa实习生"
        },
        {
          academy: "数统学院",
          name: "王小虎",
          recruit: "XXX公司招聘aa实习生"
        }
      ],
      showDetail: false,
      userData: {
        name: "林学裕",
        sex: "男",
        national: "汉族",
        birthday: "1995-3-9",
        city: "广东深圳",
        phone: "13653038416",
        qq: "547677504",
        mail: "547677504@qq.com",
        edu: "本科",
        profes: "信息管理与信息系统",
        isT: "是",
        posi: "干部",
        rank: "前20%",
        excepCity: "广东深圳",
        excepMon: "5000K",
        certificate: "计算机二级",
        lang: "大学英语六级425"
      }
    };
  },
  mounted() {
    getResumeByCompanyId(this.company._id).then(res => {
      console.log(res);
    });
  },
  computed: {
    ...mapState({
      company: state => state.front.company
    })
  },
  components: {},
  methods: {
    showDetailHandle() {
      this.showDetail = true;
    }
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'

.com-cv
  width 789px
  height 650px
  overflow hidden
  .inner-cv
    width 1590px
    height 650px
    transition all 0.35s
    &.move
      transform translate3d(-789px, 0, 0)
    .inner-box
      display inline-block
      width 789px
      vertical-align top
      .title
        height 40px
        padding-bottom 30px
        border-bottom 1px dashed #eaeaea
        .line
          display inline-block
          width 4px
          height 40px
          border-radius 5px
          background-color $bg-color
        h1
          display inline-block
          font-size 20px
          text-indent 30px
          line-height 40px
          vertical-align top
          height 100%
      .main
        width 789px
        height 450px
        .c-table
          height 0
          padding-bottom 390px
        .block
          margin-top 20px
          text-align center
    .inner-box-detail
      display inline-block
      width 789px
      height 650px
      padding 10px
      box-sizing border-box
      .d-top
        padding-bottom 5px
        border-bottom 1px solid #eaeaea
        i
          font-size 30px
          color $bg-color
          cursor pointer
          animation move 1s ease infinite
      .d-main
        padding 5px
        .d-title
          font-size 20px
          color $bg-color
        .p1
          margin 10px 0
          span
            font-size 14px
            margin-right 20px
            color #666
            small
              font-size 16px
              color #000
          &.p2
            background-color #f4f4f4
        .textarea
          padding-top 10px
          height 0
          padding-bottom 350px
          .p-title
            font-size 16px
            margin 10px 0
          .text
            font-size 16px
      .d-bottom
        width 100%
        text-align center
@keyframes move
  0%
    transform translate3d(0px, 0, 0)
  50%
    transform translate3d(-8px, 0, 0)
  10%
    transform translate3d(0px, 0, 0)
</style>
