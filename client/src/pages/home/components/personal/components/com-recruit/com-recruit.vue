<template>
  <div class="com-recruit">
    <div class="title">
      <span class="line"></span>
      <h1>招聘管理</h1>
      <span class="tip">已发布的招聘信息都在这里</span>
    </div>
    <div class="main">
      <ul class="list">
        <!-- item -->
        <li
          class="item"
          v-for="(item, index) in resumeData"
          :key="index"
        >
          <div class="top">
            <div class="item-title">{{item.title}}</div>
            <span class="fenlei">{{item.category[0]}}<i
                class="iconfont el-icon-more"
                v-if="item.category.length > 1"
              ></i></span>
            <div class="info">
              <span>{{item.salary}}/天</span>
              <p>{{item.day}}个月</p>
            </div>
            <div class="mask">
              <i
                class="el-icon-view"
                @click="detailHandle(item)"
              ></i>
            </div>
          </div>
          <div class="bottom">
            <span class="modify">修改</span>
            <span
              class="delete"
              @click="dialogVisible = true;current_id = item._id"
            >删除</span>
          </div>
        </li>
      </ul>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="20%"
      center
    >
      <span>确定删除吗？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogVisible = false;current_id = ''"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="deleteRecruit"
          size="small"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { getResume, deleteRecruit } from "api/front";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      resumeData: [],
      current_id: ""
    };
  },
  components: {},
  mounted() {
    getResume().then(res => {
      this.resumeData = res.data;
      this.setResume(res.data);
    });
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(res => {
          done();
        })
        .catch(err => {});
    },
    detailHandle(item) {
      this.$router.push({
        name: "ComRecruitD",
        params: {
          item
        }
      });
    },
    deleteRecruit() {
      this.dialogVisible = true;
      deleteRecruit(this.current_id)
        .then(res => {
          if (res.code === 0) {
            this.$router.go(0);
          } else {
            this.$message({
              type: "error",
              message: "删除失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapMutations({
      setResume: "SET_RESUME"
    })
  }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'

.com-recruit
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
  .tip
    display inline-block
    color #666
    line-height 46px
    margin-left 20px
    vertical-align top
  .main
    width 100%
    margin-top 10px
    .list
      width 750px
      margin 0 auto
      clearfix()
      .item
        border 1px solid #eaeaea
        box-sizing border-box
        margin 10px 20px
        width 190px
        float left
        text-align center
        border-radius 8px
        overflow hidden
        &:hover
          box-shadow 0px 0px 5px 0 rgba(0, 0, 0, 0.1)
        .top
          padding 10px
          border-bottom 1px solid #f4f4f4
          cursor pointer
          position relative
          .fenlei
            display block
          &:hover
            .mask
              opacity 1
          .item-title
            font-size 18px
            line-height 24px
          span, p
            line-height 20px
            color #666
          .mask
            position absolute
            left 0
            top 0
            width 100%
            height 100%
            background-color rgba(0, 0, 0, 0.5)
            text-align center
            opacity 0
            transition all 0.35s ease
            i
              height 100%
              line-height 76px
              color #a5a5a5
              font-size 24px
              &:hover
                color #fff
        .bottom
          width 100%
          clearfix()
          span
            height 30px
            line-height 30px
            width 50%
            float left
            box-sizing border-box
            cursor pointer
          .modify
            border-right 1px solid #f4f4f4
            color #409EFF
            &:hover
              color #fff
              background-color #409EFF
          .delete
            color #F56C6C
            &:hover
              background-color #F56C6C
              color #fff
</style>
