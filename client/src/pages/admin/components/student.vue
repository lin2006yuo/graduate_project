<template>
  <el-dialog
    title="学生信息"
    :visible.sync="visible"
    width="60%"
    :before-close="()=>{$emit('update:visible', false)}"
  >
    <el-table :data="student" style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover ref="myPopover" trigger="click" placement="right" width="365">
            <studentinfo :student-info="scope.row"></studentinfo>
          </el-popover>
          <span v-popover:myPopover class="click">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="academy" label="学院" width="180"></el-table-column>
      <el-table-column prop="major" label="专业" width="180"></el-table-column>
        <el-table-column
            prop="status"
            label="简历状态"
            :formatter="(row) => (!row.status ? '未通过' : (row.status === 1 ? '未审核' : '通过'))">
        </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { getResume } from "@/api/admin/admin";
import studentinfo from "./studentinfo";
import _ from "lodash";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  watch: {
    // visible(visi) {
    //   if (visi) this.getData();
    // }
  },
  props: {
    visible: {
      default: false
    },
    // company: {
    //   type: Object,
    //   default: () => ({})
    // }
    student: {
      type: Array,
      default: () => []
    }
  },
  components: {
    studentinfo
  }
};
</script>
<style lang="stylus">
.click {
  color: #409EFF;
  cursor: pointer;
}
</style>