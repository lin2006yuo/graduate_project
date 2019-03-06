<template>
    <div class="an">
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
            :visible.sync="deleVisible"
            width="30%">
            <span>确定要删除吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleVisible = false">取 消</el-button>
                <el-button type="primary" @click="delClick">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <div class="pic">
            <div class="header">
                首页轮播图设置
            </div>
            <el-upload
                action="http://localhost:3000/admin/uploadPic"
                list-type="picture-card"
                :file-list="swiperItem"
                :on-preview="handlePictureCardPreview"
                :before-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { getAnnounce, getAnnCount, deleteAnnounce, getSwiperPic, deletePic } from 'api/admin/admin'
import { createAnnouce } from '@/common/js/Announce';
import {mapMutations, mapGetters, mapActions} from 'vuex'

const COUNT = 10 //一页10条记录
export default {
    data() {
        return {
          deleVisible: false,
          curId: '',
          curIndex: 0,
          dialogImageUrl: '',
          swiperItem: []
        }
    },


    //  钩子
    mounted(){
        this._httpGetAnnounce()
        this._initCount()  
        this._initSwiperPic()
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
            this.deleVisible = true
            this.curId = row.id
        },
        // 删除公告
        delClick(){
            this.deleVisible = false
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
        handleRemove(file, fileList) {
            return this.$confirm('确定要删除吗', '提示').then(res => {
                deletePic(file).then(res => {
                    console.log(res)
                })
            })
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.deleVisible = true;
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
        }),
        _initSwiperPic() {
            getSwiperPic().then(res => {
                if(res.type === 0) {
                    res.data.forEach(v => {
                        v.url = 'http://' + v.picUrl
                    })
                    this.swiperItem = res.data
                } else {
                    throw new Error('获取轮播图错误')
                }
            })
        }
    }
};
</script>

<style scoped lang="stylus">
.pic {
    margin-top 20px
    padding 20px
    background-color #fff
    font-size 16px
    .header {
        margin-bottom 20px
    }
    >>> .el-upload-list__item-preview {
        display none !important
    }
}
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
