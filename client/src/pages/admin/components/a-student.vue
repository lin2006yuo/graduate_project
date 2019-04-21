<template>
    <div class="a-company">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="logistics-item">
                    <div class="name">注册学生数</div>
                    <div class="number blue">{{sum}}</div>
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
                    <div class="item yellow">总数量：{{jlInfo.total}}</div>
                    <div class="item green">通过数：{{jlInfo.succuss}}</div>
                    <div class="item blue">待审核数：{{jlInfo.undefind}}</div>
                    <div class="item red">未通过数：{{jlInfo.fail}}</div>
                </div>
            </el-col>
        </el-row>
        <el-table
        :data="studentList"
        style="width: 100%">
            <el-table-column
                label="学生名称">
                <template slot-scope="scope">
                    <div style="cursor: pointer" @click="rowClick(scope.row)">{{scope.row.name}}</div>
                </template>
            </el-table-column>
            <el-table-column
                width="300px"
                prop="bian"
                label="编辑">
                <template slot="header" slot-scope="scope">
                    <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="search"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    >
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.name }}</div>
                        </template>
                    </el-autocomplete>
                </template>
                <template slot-scope="scope">
                    <el-button @click="update(scope.row)" type="text" size="small">修改密码</el-button>
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
        <el-dialog title="学生信息" :visible.sync="showStudentInfo" width="400px">
            <studentinfo :student-info="studentInfo"></studentinfo>
        </el-dialog>
        <el-dialog title="修改密码" :visible.sync="showModel" width="300px">
            <el-input  size="mini" v-model="newPwd"></el-input>
            <el-button size="mini" type="primary" @click="updatePwd">确定</el-button>
        </el-dialog>
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
import { getAllStudent, getStduentCount, deleteStudent, getJlCount, updateStudentPassword, getStudentByName } from 'api/admin/admin'
import {mapMutations, mapGetters, mapActions} from 'vuex'
import studentinfo from './studentinfo'

const COUNT = 10 //总记录数
export default {
    data() {
        return {
            dialogVisible: false,
            curId: '',
            curIndex: 0,
            sum: 0,
            jlInfo: {total: 0, succuss: 0, fail: 0, undefind: 0},
            studentList: [],
            showModel: false,
            newPwd: '',
            studentInfo: {city: []},
            showStudentInfo: false,
            search: ''
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
        ]),
        chartData() {
            return {
                columns: ['状态', '访问用户'],
                rows: [
                    { '状态': '通过', '访问用户': this.jlInfo.succuss },
                    { '状态': '待审核', '访问用户': this.jlInfo.undefind },
                    { '状态': '未通过', '访问用户': this.jlInfo.fail },
                ]
            }
        }
    },
    watch: {
        cTotalCount(val){
            if(val === 10){
                this.curIndex --
            }
        }
    },
    components: {studentinfo},
    methods: {
        querySearchAsync(queryString, cb) {
            getStudentByName(queryString).then(res => {
                this.studentList = res.data
                this.count = 0
                cb(res.data)
            })
        },
        rowClick(row) {
            this.studentInfo = row
            this.showStudentInfo = true
        },
        update({_id}) {
            this.showModel = true
            this.curId = _id
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
            deleteStudent(this.curId).then(res => {
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
        updatePwd() {
            updateStudentPassword(this.curId, this.newPwd).then(res => {
                if(res.code === 0) {
                    this.$message({ type: 'success', message: '修改成功' })
                    this.showModel = false
                }
            })
        },
        _initCompany(cur = 1,limit = COUNT){
            getAllStudent(limit,cur).then(res => {
                // this.tableData = res.data
                this.studentList = res.data
            }).catch(err => {
                console.log(err); 
            })
        },
        _initCount(){
            getStduentCount().then(res => {
                // this.totalCount = res.data
                this.sum = res.data
            }).catch(err => {
                console.log(err)
            })

            getJlCount().then(res => {
                this.jlInfo = res.data
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
    >>> .el-input {
        display inline-block
        width 200px
    }
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
