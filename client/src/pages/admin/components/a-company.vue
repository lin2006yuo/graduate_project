<template>
    <div class="a-company">
        <el-row :gutter="20">
            <el-col :span="6">
                <div class="logistics-item">
                    <div class="name">入驻公司</div>
                    <div class="number blue">{{sum}}</div>
                </div>
            </el-col>
            <!-- <el-col :span="6" class="logistics-item"></el-col> -->
        </el-row>
        <div class="top">
            <i class="el-icon-plus" @click="add"></i>
        </div>
        <el-table
        v-if="companyList"
        :data="companyList"
        @cell-click="cellClick"
        style="width: 100%">
            <el-table-column
                prop="companyName"
                label="公司名称">
                <template slot-scope="scope">
                    <el-popover ref="myPopover" trigger="hover" placement="right" @show="popoverShow(scope.row)">
                        <div class="company-info">
                            <div class="left">
                                <img width="50" height="50" :src="`http://${curCompany.avatar}`" alt="头像">
                            </div>
                            <div class="right">
                                <div class="companyName">公司名称：</div>
                                <div>{{curCompany.companyName ? curCompany.companyName : '暂未完善'}}</div>
                                <div class="companyName">公司简介：</div>
                                <div>{{curCompany.companyIntro ? curCompany.companyIntro : '暂未完善'}}</div>
                                <div class="companyName">联系人：</div>
                                <div>{{curCompany.contact ? curCompany.contact : '暂未完善'}}</div>
                                <div class="companyName">联系电话：</div>
                                <div>{{curCompany.phone ? curCompany.phone : '暂未完善'}}</div>
                            </div>
                        </div>
                    </el-popover>
                    <span v-popover:myPopover class="click">{{scope.row.companyName}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="录取比">
                <template slot-scope="scope">
                    <span class="click" @click="curRow = scope.row;luquVisible = true">{{scope.row.luqu}}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="luqulv"
                label="录取率">
            </el-table-column>
            <el-table-column
                width="300px"
                prop="bian"
                label="编辑">
                <template slot="header" slot-scope="scope">
                    <el-autocomplete
                    v-model="search"
                    popper-class="my-autocomplete"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    >
                        <template slot-scope="{ item }">
                            <div class="name">{{ item.companyName }}</div>
                        </template>
                    </el-autocomplete>
                </template>
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
        <luqu :visible.sync="luquVisible" :company="curRow"></luqu>
    </div>
</template>

<script type="text/ecmascript-6">
import { getAllCompany, getAllCompanyCount, deleteCompany, getCompanyByName } from 'api/admin/admin'
import luqu from './luqu'
import {mapMutations, mapGetters, mapActions} from 'vuex'

const COUNT = 10 //总记录数
export default {
    data() {
        return {
            dialogVisible: false,
            curId: '',
            curIndex: 0,
            sum: 0,
            search: '',
            curRow: {},
            luquVisible: false,
            curCompany: {}
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
    components: {
        luqu
    },
    methods: {
        querySearchAsync(queryString, cb) {
            getCompanyByName(queryString).then(res => {
                this.setCompanyList(res.data)
                this.count = 0
                cb(res.data)
            })
        },
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
                this.$message({ type: 'success', message: '删除成功' })
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
        cellClick(row, column, cell, event) {
            if(column.property === 'companyName') {
                console.log('*******')
            }
        },
        popoverShow(company) {
            this.curCompany = company
        },
        _initCompany(cur = 1,limit = COUNT){
            getAllCompany(limit,cur).then(res => {
                // this.tableData = res.data
                const data = res.data
                data.forEach(company => {
                    const pass = company.jl.filter(i => i.status === 2).length
                    company.luqu = `${pass} / ${company.jl.length}`
                    company.luqulv = !company.jl.length ? '0%' : ((pass/company.jl.length).toFixed(2) * 100) + '%'
                })
                // console.log(data)
                this.setCompanyList(data)
            }).catch(err => {
                console.log(err); 
            })
        },
        _initCount(){
            getAllCompanyCount().then(res => {
                // this.totalCount = res.data
                this.sum = res.data
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
    .click {
        color: #409EFF;
        cursor pointer
    }
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
