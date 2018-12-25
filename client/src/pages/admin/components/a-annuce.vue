<template>
    <div class="Aannuce">
        <div class="block">
            <i class="el-icon-plus" @click="addAnnce"></i>
        </div>
        <el-table
        class="e-table"
        :data="hhh"
        style="width: 100%"
        @row-click="checkClick">
            <el-table-column
                prop="title"
                label="标题"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="time"
                label="发表时间"
                width="100px"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                width="100px">
                <template slot-scope="scope">
                    <el-button @click.stop="editorClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click.stop="comfirm(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                layout="prev, pager, next"
                :total="totalCount"
                @current-change="curChange">
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
import { getAnnounce, getAnnCount, deleteAnnounce } from 'api/admin/admin'
import { createAnnouce } from '@/common/js/Announce';
import {mapMutations, mapGetters, mapActions} from 'vuex'

const COUNT = 10 //一页10条记录
export default {
    data() {
        return {
          dialogVisible: false,
          curId: '',
          curIndex: 0
        }
    },


    //  钩子
    mounted(){
        this._httpGetAnnounce()
        this._initCount()  
    },
    activated(){
      if(this.$route.query.update){
          this._httpGetAnnounce()
      }
    },




    components: {},
    computed: {
        hhh(){
            return this.announceList
        },
        ...mapGetters([
            'announceList',
            'totalCount'
        ])
    },
    methods: {
        checkClick(row){
            this.$router.push({name: 'ACheck', params: {
                currentAnn: row
            }})
        },
        editorClick(row){
            this.$router.push({name: 'AEditor', query: { status: 0 }, params: {
                form: row
            }})
        },
        comfirm(row){
            this.dialogVisible = true
            this.curId = row.id
        },
        // 删除公告
        delClick(){
            this.dialogVisible = false
            deleteAnnounce(this.curId).then(res => {
                this.deleteAnnounce(this.curId)  
                this.alterTotalCount(-1)
            }).catch(err => {
                console.log('删除失败')
            })
        },
        addAnnce(){
            this.$router.push({path: '/admin/index/a-annuce-editor',query: { status: 1 }})
        },
        //选择/分页
        curChange(cur){
            this.curIndex = cur
            this._httpGetAnnounce(cur)
        },
        sizeChange(){
            console.log('条数改变');
        },
        ...mapActions(['deleteAnnounce']),
        //获取校园公告列表
        _httpGetAnnounce(cur = 1){
            getAnnounce(cur,COUNT).then(res => {
                let annouce = res.data.map(i => {
                    return createAnnouce(i)
                })
                //保存到vuex
                this.setAnnounce(annouce)
                
            }).catch(err => {
                console.log(err)
            })
        },
        _initCount() {
            getAnnCount().then(res => {
                this.setTotalCount(res.data)
            })
        },
        _debug(){
            console.log('请求数据');       
        },
        ...mapMutations({
            setAnnounce: 'SET_ANNOUNCE',
            setTotalCount: 'SET_TOTALCOUNT',
            alterTotalCount: 'ALTER_TOTALCOUNT'
        })
    }
};
</script>

<style scoped lang="stylus">
.Aannuce
    padding 20px
    background-color #fff
    .block
        width 100%
        text-align right 
        i
            font-size 30px
            cursor pointer
    .e-table
        cursor pointer
    .pagination
        margin-top 20px
        text-align center

</style>
