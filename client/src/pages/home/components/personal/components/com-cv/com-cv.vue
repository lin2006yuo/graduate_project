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
            @sort-change="sortChange"
          >
            <el-table-column
              prop="date"
              label="日期"
              width="100"
              :formatter="(row) =>{return row.date.slice(0,10)}"
              sortable="custom"
            />
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
              prop="title"
              label="应聘信息"
            >
            </el-table-column>
            <el-table-column
              label="状态"
              sortable="custom"
              prop="status"
              :formatter="(row) => {
                const {status: value} = row
                if(value === 2) {
                  return '通过'
                } else if (value === 1) {
                  return '待审核'
                } else if(value === 0) {
                  return '未通过'
                } 
              }"
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
                  @click="showDetailHandle(scope.$index)"
                >查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="count"
              :page-size="6"
              @current-change="handleCurrentChange"
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
          <h1 class="d-title">{{userData.title}}</h1>
          <p class="p1">
            <span>姓名：<small>{{userData.name}}</small></span>
            <span>性别：<small>{{userData.sex}}</small></span>
            <span>民族：<small>{{userData.national}}</small></span>
            <span>出生年月：<small>{{userData.birthday}}</small></span>
          </p>
          <p class="p1">
            <span>现居地：<small>{{userData.city[0]}}&nbsp;|&nbsp;{{userData.city[1]}}</small></span>
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
            <span>期待工作地：<small>{{userData.excepCity[0][0]}}</small></span>
            <span>期待薪酬：<small>{{userData.excepMon}}</small></span>
          </p>
          <p class="p1">
            <span>技能证书：<small>{{userData.certificate}}</small></span>
            <span>语言技能：<small>{{userData.lang.name}}&nbsp;|&nbsp;{{userData.lang.score}}</small></span>
          </p>
          <div class="textarea">
            <div class="p-title">技能专业描述</div>
            <div class="text">
              {{userData.textarea}}
            </div>
          </div>
        </div>
        <div class="d-bottom" v-if="haspass === 2">
          <el-button type="primary" :disabled="true">已通过</el-button>
        </div>
        <div class="d-bottom" v-else-if="haspass === 0">
          <el-button type="primary" :disabled="true">已放弃</el-button>
        </div>
        <div class="d-bottom" v-else>
          <el-button type="primary" @click="pass(2)">通过</el-button>
          <el-button type="info" @click="pass(0)">放弃</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getResumeByCompanyId, passJl } from "@/api/front";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
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
      },
      currentJlId: '',
      page: 1,
      count: 0,
      haspass: 0,
      currentIndex: "",
      prop: 'date',
      order: 'ascending',
    };
  },
  mounted() {
    this.reset()
    this.init()
  },
  filters: {
    status(value) {
      if(value === 2) {
        return '通过'
      } else if (value === 1) {
        return '待审核'
      } else if(value === 0) {
        return '未通过'
      } 
    }
  },
  computed: {
    ...mapState({
      company: state => state.front.company
    })
  },
  components: {},
  methods: {
    init() {
      getResumeByCompanyId(this.company._id, this.page, this.prop, this.order).then(res => {
        if(res.code === 0) {
          this.tableData = this.handleTableData(res.data.data)
          this.count = res.data.count
        }
      });
    },
    reset() {
      this.page = 1
    },
    showDetailHandle(index) {
      this.userData = this.tableData[index].jlInfo
      this.currentJlId = this.tableData[index].id
      this.currentIndex = index
      this.haspass = this.tableData[index].status
      this.showDetail = true;
    },
    handleCurrentChange(index) {
      this.page = index
      this.init()
    },
    handleTableData(arr) {
      return arr.filter(c => {
        if(Object.prototype.toString.call(c) !== '[object Object]') return false
        return true
      }).map(c => {
            const tableItem = {}
            tableItem.name = c.studentId.name
            tableItem.academy = c.studentId.academy
            tableItem.title = c.recruitId.title
            tableItem.jlInfo = {...c.jlId, ...c.studentId, title: c.recruitId.title}
            tableItem.id = c._id
            tableItem.status = c.status
            tableItem.date = c.date
            return tableItem
      })
    },
    pass(pass) {
      // pass 1, unpass 0
      const str = pass === 2 ? '确定要通过吗？' : '确定要放弃吗？'
      this.$confirm(str, '提示', { type: 'warning' }).then(() => {
          const id = this.currentJlId
          passJl({id, pass}).then(res => {
            if(res.type === 0) {
              if(pass) {
                this.$message({ type: 'success', message: '简历通过' })
                this.haspass = 2
                this.tableData[this.currentIndex].status = 2
              }else {
                this.$message({ message: '放弃简历' })
                this.haspass = 0
                this.tableData[this.currentIndex].status = 0
              }
            }
          })
      }).catch(() => {})
    },
    sortChange({column, prop, order} ) {
      console.log(column, prop, order)
      this.prop = prop
      this.order = order
      this.init()
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
          background-color #ab4d72
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
