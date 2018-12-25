<template>
    <div class="a-company">
        <div class="top">
            <i class="el-icon-plus" @click="add"></i>
        </div>
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
    .top
        text-align right 
        i
            font-size 30px
            cursor pointer
    .block  
        margin-top 20px
        text-align center
</style>
