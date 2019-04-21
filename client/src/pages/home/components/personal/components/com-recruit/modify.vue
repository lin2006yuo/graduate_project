<template>
    <el-dialog
      title="修改招聘信息"
      :visible="visible"
      @update:visible="handleUpdateVisible"
      width="50%"
      top="1vh"
      >
    <div class="com-pulish">
            <el-form class="el-form" :model="form" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="招聘学院">
                    <el-select v-model="form.category" multiple placeholder="请选择" style="width: 500px">
                        <el-option
                        v-for="item in academy"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="薪酬待遇">
                    <el-select 
                        allow-create
                        filterable
                        default-first-option
                        v-model="form.salary" placeholder="请选择" style="width:100px">
                        <el-option
                        v-for="item in ['100','150','200']"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                    <span>/ 天</span>
                </el-form-item>
                <el-form-item label="实习期限">
                    <el-select 
                        v-model="form.day" placeholder="请选择" style="width:100px">
                        <el-option
                        v-for="item in 12"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                    <span>个月</span>
                </el-form-item>
                <div class="require-wrapper">
                    <div class="require">职位要求：</div>
                    <div class="quill">
                        <quill-editor v-model="form.content"
                                                    ref="myQuillEditor"
                                                    class="editer"
                                                    :options="editorOption" @ready="onEditorReady($event)">
                        </quill-editor>
                    </div>
                </div>
            </el-form>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitModify">确 定</el-button>
      </span>
    </el-dialog>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor' //调用编辑器
import { updateResume } from 'api/front'


export default {
    data() {
        return {
            vhtml:'',
            editorOption: {
                    modules:{
                        toolbar:[
                          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                           ['blockquote', 'code-block','link'],
                           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  
                           [{ 'align': [] }],
                           [{ 'size': ['small', false, 'large', 'huge'] }], 
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
            ]
        };
    },
    methods: {
        handleUpdateVisible(val) {
            this.$emit('update:visible', false)
        },
        onEditorReady(e){

        },
        submitModify() {
            updateResume(this.form).then(res => {
                if(!res.code) {
                    this.$message({type: 'success', message: '修改成功'})
                    this.$emit('update:visible', false)
                } else {
                    this.$message({type: 'error', message: '修改失败'})
                }
            }).catch(error => {
                 this.$message({type: 'error', message: error})
            })
        }
    },
    components: {
        quillEditor
    },
    props: {
        visible: {},
        form: {}
    }
}
</script>
<style scoped lang="stylus">
.com-publish {
    >>> .el-form-item__content {
        line-height 0
    }

}
.require-wrapper {
    display: flex;
}
.require
    font-size 16px 
    color #666
    margin-bottom 10px
.quill
    height 0
    padding-bottom 300px
.block
    text-align center
.quill-editor
    height 250px
</style>
