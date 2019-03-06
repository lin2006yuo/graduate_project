<template>
    <div class="result">
        <div class="title">
            <span class="line"></span>
            <h1>网申记录</h1>
        </div>
        <div class="main">
            <el-table
            border
            :data="tableData"
            >
            <el-table-column
                label="日期"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.date | date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="公司">
            </el-table-column>
            <el-table-column
                label="招聘简介">
                <template slot-scope="scope">
                    <span v-html="scope.row.title"></span>
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.status | status }}</span>
                </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { getResumeById } from '@/api/front'
import manba from 'manba'

export default {
    data() {
        return {
            tableData: [],
        };
    },
    components: {},
    mounted() {
        const studentId = this.$store.state.front.student._id
        getResumeById(studentId).then(res => {
           this.tableData = res.data.map(v => {
               return {...v.recruitId, ...v.companyId, status: v.status, date: v.date}
           })
        })
    },
    filters: {
        date(value) {
            return manba(+new Date(value)).format('YYYY-MM-dd')
        },
        status(value) {
            if(value == 1) {
                return '等待考核'
            } else if(value == 2) {
                return '通过'
            } else if(value == 0) {
                return '未通过'
            } else {
                return '服务器错误'
            }
        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'
.result
    width 100%
    // padding 40px 20px
    .title
        height 40px
        padding-bottom 20px
        margin-bottom 20px
        border-bottom 1px dashed #eaeaea
       .line
           display inline-block
           width 4px
           height 40px
           background-color $bg-color
        h1
            display inline-block
            font-size 20px
            text-indent 30px
            line-height 20px
            vertical-align 64%
            height 100%
    .main
        margin 20px auto 0
        width 800px
        
</style>
