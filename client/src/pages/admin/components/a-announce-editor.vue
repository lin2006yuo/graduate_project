<template>
    <div class="editor">
        <div class="back" @click="back">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="main">
            <el-form :model="form" label-width="100px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="发布者">
                    <el-select
                        v-model="form.publisher"
                        filterable
                        allow-create
                        default-first-option
                        placeholder="请选择发布者">
                        <el-option
                        v-for="item in academy"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="0">
                    <div class="quill">
                        <quill-editor v-model="form.content"
                                                    ref="myQuillEditor"
                                                    class="editer"
                                                    :options="editorOption">
                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="block">
                        <el-button type="primary" v-show="routerStatus === 0" @click.stop="updateAnnounce">修改</el-button>
                        <el-button type="primary" v-show="routerStatus === 1" @click.stop="pulishAnnouce">发布</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <el-upload
                action="http://localhost:3000/admin/uploadAnnouncePic"
                list-type="picture-card"
                v-show="false"
                :on-success="onUploadSuccess">
                <el-button slot="trigger" size="small" type="primary" ref="uploadControl">选取文件</el-button>
                <i class="el-icon-plus"></i>
            </el-upload>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import { publishAnnouce, updateAnnounce } from 'api/admin/admin'
import { createAnnouce } from '@/common/js/Announce';
import {mapActions,mapMutations} from 'vuex'


export default {
    data() {
        return {
            form: {
                title: '',
                publisher: '韶关学院',
                content: ''
            },
            editorOption: {
                    modules:{
                        toolbar:[
                          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                           ['blockquote', 'code-block','link'],
                           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  
                           [{ 'align': [] }],
                           [{ 'size': ['small', false, 'large', 'huge'] }],
                           ['image'], 
                        ]
                    },
                    placeholder: '请输入职位要求',
                    
            },
            academy: [
                '英东生命科学学院','英东农业科学与工程学院','英东食品科学与工程学院','物理与机电工程学院',
                '信息科学与工程学院','文学院','外语学院',
                '化学与环境工程学院','经济管理学院','政治与公共事务管理学院','法学院',
                '数学与统计学院','教育学院','美术与设计学院','音乐学院',
                '旅游与地理学院','土木工程学院',
            ],
            routerStatus: '' // 0编辑 1添加
        };
    },


    //  钩子
    mounted(){
        this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
    },
    activated(){
        this.routerStatus = this.$route.query.status
        if(this.routerStatus === 0){
            this.form = this.$route.params.form 
        }else{
            this.form = {
                title: '',
                publisher: '韶关学院',
                content: ''
            }
        }
    },




    components: {
        quillEditor
    },
    methods: {
        imgHandler(image) {
            this.$refs.uploadControl.$el.click()
        },
        onUploadSuccess(res) {
            const url = 'http://' + res.data.picUrl
            console.log(url)
            this.$refs.myQuillEditor.quill.insertEmbed(1, 'image', url)
        },
        pulishAnnouce(){
            publishAnnouce(this.form).then(res => {
                if(res.code === 0){
                    console.log('发布成功');
                    this.addAnnounce(createAnnouce(res.data))
                    this.alterTotalCount(1)
                    this.back()
                }
            }).catch(err => {
                console.log('发布失败。。')
            })
        },
        back(){
            // this.$router.push({
            //     path: '/admin/index/a-annuce',
            //     query: {
            //         update: true
            //     }
            // })
            this.$router.back()
        },
        updateAnnounce(){
            updateAnnounce(this.form).then(res => {
                if(res.code === 0){
                    this.$router.back()
                }
                
            }).catch(err => {
                console.log(err);
                
            })
        },
        ...mapActions([
            'addAnnounce'
        ]),
        ...mapMutations({
            alterTotalCount: 'ALTER_TOTALCOUNT'
        })
    }
};
</script>

<style scoped lang="stylus">
.editor
    padding 20px
    background-color #fff
    >>> .el-form-item__content {
        line-height 20px
    }
    .back
        margin 10px 0
        i
            font-size 32px
            cursor pointer
    .quill
        height 0
        padding-bottom 550px
        .quill-editor
            height 500px
    .block
        text-align center
</style>
