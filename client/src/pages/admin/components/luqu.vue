<template>
  <div v-if="visible" class="studentinfo">
    <el-dialog
      :title="`${company.companyName}的招聘信息`"
      :visible.sync="visible"
      width="60%"
      :before-close="()=>{$emit('update:visible', false)}"
    >
      <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="top" class="demo-table-expand">
                <el-form-item label="薪酬：">
                    <span>{{ props.row.salary }}/天</span>
                </el-form-item>
                <el-form-item label="实习天数：">
                    <span>{{ props.row.day }}/月</span>
                </el-form-item>
                <el-form-item label="招聘学院：">
                    <span v-for="(item, index) in props.row.category" :key="`resume-${index}`">{{ item }}</span>
                </el-form-item>
                <el-form-item label="职位要求：">
                    <div v-html="props.row.content"></div>
                </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column
          prop="date"
          label="发布日期"
          width="180"
          :formatter="(row)=>(row.date.slice(0,10))"
        ></el-table-column>
        <el-table-column prop="number" label="录取比">
          <template slot-scope="scope">
            <span
              class="click"
              @click="luquClick(scope.row)"
            >{{scope.row.jlRate ? scope.row.jlRate : '0/0'}}</span>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-popover
                placement="left"
                width="160"
                trigger="manual"
                :ref="'popover-' + scope.row._id">
                <p style="text-align: center;margin: 15px 0px">确定要删除该招聘吗？</p>
                <div style="text-align: center; margin: 0">
                  <el-button  size="mini" type="text"  @click="pCancel(scope.row._id)">取消</el-button>
                  <el-button type="primary" size="mini" @click="pSubmit(scope.row,scope)">确定</el-button>
                </div>
                <el-button  type="primary" slot="reference" size="mini" @click="pOpen(scope.row._id,scope)">删除
                </el-button>
            </el-popover>

          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <student :visible.sync="studentVisible" :student="curRow"/>
  </div>
</template>
<script>
import { getResume } from "@/api/admin/admin";
import {deleteRecruit} from '@/api/front'
import student from "./student";
import _ from "lodash";
export default {
  data() {
    return {
      tableData: [],
      jl: [],
      studentVisible: false,
      curRow: [],
      visible2: false
    };
  },
  mounted() {
    this.company._id && this.getData();
  },
  methods: {
    getData() {
      getResume(this.company._id).then(res => {
        const jlGroup = _.groupBy(this.company.jl, "recruitId._id");
        this.tableData = res.data.map(row => {
          if (jlGroup[row._id]) row.jl = jlGroup[row._id];
          if (jlGroup[row._id])
            row.jlRate = `${
              jlGroup[row._id].filter(i => i.status === 2).length
            } / ${jlGroup[row._id].length}`;
          return row;
        });
      });
    },
    luquClick(row) {
      this.studentVisible = true;
      this.curRow = row.jl
        ? row.jl.map(com2jl => {
            return { ...com2jl.studentId, status: com2jl.status };
          })
        : [];
    },
    pCancel(id) {
        this.pClose(id)
    },
    pClose(id) {
        this.$refs[`popover-` + id].doClose()
    },
    pOpen(id,scope){
        this.$refs[`popover-` + id].doShow()
    },
    pSubmit(row, scope) {
        deleteRecruit(row._id).then(res => {
            if(!res.code) {
                const {$index:index} = scope
                this.tableData.splice(index, 1)
                this.$refs[`popover-` + row._id].doShow()
                this.$message({type: 'success', message: '删除成功'})
            }
        })
    }
  },
  watch: {
    visible(visi) {
      if (visi) this.getData();
    }
  },
  props: {
    visible: {
      default: false
    },
    company: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    student
  }
};
</script>
<style lang="stylus">
.studentinfo {
    .el-dialog__body {
        height 450px
        overflow-y auto
    }
    .el-form-item {
        margin-bottom 0
    }
    .el-form-item__label {
        line-height 13px
        font-size 13px
        font-weight bold
        padding 0
    }
}
.click {
  color: #409EFF;
  cursor: pointer;
}
</style>