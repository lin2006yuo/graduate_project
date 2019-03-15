<template>
    <div class="a-company">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="logistics-item">
                    <div class="name">注册学生数</div>
                    <div class="number blue">2</div>
                </div>
            </el-col>
            <!-- <el-col :span="6" class="logistics-item"></el-col> -->
        </el-row>
        <el-row class="mt-sm mb-sm logistics">
            <el-col :span="10">
                <span class="title">简历分析</span>
                <ve-pie :data="chartData"></ve-pie>
            </el-col>
            <el-col :span="10">
                <div class="container">
                    <div class="item yellow">总数量：</div>
                    <div class="item green">通过数：</div>
                    <div class="item blue">待审核数：</div>
                    <div class="item red">未通过数：</div>
                </div>
            </el-col>
        </el-row>
        <el-table
        v-if="companyList"
        :data="companyList"
        style="width: 100%">
            <el-table-column
                prop="companyName"
                label="公司名称">
            </el-table-column>
            <el-table-column
                width="100px"
                prop="bian"
                label="编辑">
                <template slot-scope="scope">
                    <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small" @click="comfirm(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            :current-page.sync="curIndex"
            background
            layout="prev, pager, next"
            :total="cTotalCount"
            @current-change="curChange"
            @size-change="sizechange">
            </el-pagination>
        </div>
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
            <span>确定要删除吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delClick">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import { getAllCompany, getAllCompanyCount, deleteCompany } from 'api/admin/admin'
import {mapMutations, mapGetters, mapActions} from 'vuex'

const COUNT = 10 //总记录数
export default {
    data() {
        return {
            dialogVisible: false,
            curId: '',
            curIndex: 0,
            chartData: {
                columns: ['状态', '访问用户'],
                rows: [
                    { '状态': '通过', '访问用户': 1393 },
                    { '状态': '待审核', '访问用户': 2923 },
                    { '状态': '未通过', '访问用户': 3530 },
                ]
            }
        }
    },
    mounted(){
        this._initCompany()
        this._initCount()
    },
    computed: {
        ...mapGetters([
            'companyList',
            'cTotalCount'
        ])
    },
    watch: {
        cTotalCount(val){
            if(val === 10){
                this.curIndex --
            }
        }
    },
    components: {},
    methods: {
        editClick(row){
            this.$router.push({name: 'ACEditor', query: {status: 0}, params: {
                form: row
            }})
        },
        add(){
             this.$router.push({path: '/admin/index/a-company-editor', query: {
                 status: 1
             }})
        },
        curChange(cur){
            this.curIndex = cur
            this._initCompany(this.curIndex)
        },
        comfirm(row){
            this.dialogVisible = true
            this.curId = row._id
        },
        delClick(){
            //发送删除请求
            deleteCompany(this.curId).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
            //删除vuex记录
            // this.deleteCompany(this.curId)
            this._initCompany(this.curIndex)
            this._initCount()
            //关闭提示框
            this.dialogVisible = false
        },
        sizechange(){
            console.log(1);
            
        },
        _initCompany(cur = 1,limit = COUNT){
            getAllCompany(limit,cur).then(res => {
                // this.tableData = res.data
                this.setCompanyList(res.data)
            }).catch(err => {
                console.log(err); 
            })
        },
        _initCount(){
            getAllCompanyCount().then(res => {
                // this.totalCount = res.data
                this.setCount(res.data)
            }).catch(err => {
                console.log(err)
            })
        },
        ...mapMutations({
            setCompanyList: 'SET_COMPANY',
            setCount: 'SET_CTOTALCOUNT'
        }),
        ...mapActions([
            'deleteCompany'
        ])
    }
};
</script>

<style scoped lang="stylus">
.a-company
    padding 20px
    background-color #fff
    .container
        display flex
        flex-direction column
        margin-top 72px
        .item
            padding 15px
            margin 5px
            background-color #000
            font-size 20px
            font-weight bold
            color #fff
            border-radius 12px
            &.yellow
                background-color #f7da47
            &.red
                background-color #ee706d
            &.green
                background-color #58ca9a
            &.blue
                background-color #447eff
    .logistics 
        border-radius 15px
        background-color #f1f1f1
        padding 15px
        .title
            font-size 15px
            font-weight bold
    .logistics-item
        height 120px
        border-radius 15px
        background-color #58ca9a
        text-align center
        box-sizing border-box
        padding 15px
        color #fff
        .name
            font-size 18px 
            font-weight bold
        .number
            font-size 45px
    .top
        text-align right 
        i
            font-size 30px
            cursor pointer
    .block  
        margin-top 20px
        text-align center
</style>
