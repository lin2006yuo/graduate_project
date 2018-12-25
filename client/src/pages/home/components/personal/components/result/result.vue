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
            style="width: 100%">
            <el-table-column
                prop="date"
                label="日期"
                width="180">
            </el-table-column>
            <el-table-column
                prop="address"
                label="公司">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="50">
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                address: '上海市普陀区金沙江路 1518 弄',
                status: '等待回复'
            }, {
                date: '2016-05-04',
                address: '上海市普陀区金沙江路 1517 弄',
                status: '等待回复'
            }, {
                date: '2016-05-01',
                address: '上海市普陀区金沙江路 1519 弄',
                status: '等待回复'
            }, {
                date: '2016-05-03',
                address: '上海市普陀区金沙江路 1516 弄',
                status: '等待回复'
            }]
        };
    },
    components: {}
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
