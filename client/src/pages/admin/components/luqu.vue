<template>
    <div v-if="visible">
        <el-dialog
            :title="`${company.companyName}的招聘信息`"
            :visible.sync="visible"
            width="60%"
            :before-close="()=>{$emit('update:visible', false)}"
        >
            <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="标题" width="180"></el-table-column>
            <el-table-column
                prop="date"
                label="发布日期"
                width="180"
                :formatter="(row)=>(row.date.slice(0,10))"
            ></el-table-column>
            <el-table-column prop="number" label="录取比">
                    <template slot-scope="scope">
                        <span class="click" @click="luquClick(scope.row)">{{scope.row.jlRate ? scope.row.jlRate : '0/0'}}</span>
                    </template>
            </el-table-column>
            </el-table>
        </el-dialog>
        <student :visible.sync="studentVisible" :student="curRow"/>
    </div>
</template>
<script>
import { getResume } from "@/api/admin/admin";
import student from './student'
import _ from 'lodash'
export default {
  data() {
    return {
      tableData: [],
      jl: [],
      studentVisible: false,
      curRow: [],
    };
  },
  mounted() {
    this.company._id && this.getData();
  },
  methods: {
    getData() {
      getResume(this.company._id).then(res => {
            const jlGroup = _.groupBy(this.company.jl, 'recruitId._id')
            this.tableData = res.data.map(row => {
                if(jlGroup[row._id]) row.jl = jlGroup[row._id]
                if(jlGroup[row._id]) row.jlRate = `${jlGroup[row._id].filter(i => i.status === 2).length} / ${jlGroup[row._id].length}`
                return row
            })
      });
    },
    luquClick(row) {
        this.studentVisible=true; 
        this.curRow = row.jl ? row.jl.map(com2jl => {
            return {...com2jl.studentId, status: com2jl.status}
        }) : []
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
    .click {
        color: #409EFF;
        cursor pointer
    }
</style>