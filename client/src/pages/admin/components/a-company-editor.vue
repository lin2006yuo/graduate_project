<template>
    <div class="check">
        <div class="back" @click="$router.back()">
            <i class="el-icon-arrow-left"></i>
        </div>
        <div class="main">
            <el-form :model="form" label-width="100px">
                <el-form-item label="公司名称">
                    <el-input v-model="form.companyName"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-show="routerStatus === 0" type="primary" @click.stop="edit">修改</el-button>
                    <el-button v-show="routerStatus === 1" type="primary" @click.stop="submit">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { addCompany,updateCompany } from 'api/admin/admin'
import {mapActions} from 'vuex'
export default {
    data() {
        return {
            form: {},
            routerStatus: 1   // 0修改 1发布
        };
    },
    activated(){
        this.routerStatus = this.$route.query.status
        if(this.routerStatus === 0){
            this.form = this.$route.params.form 
        }else{
            this.form = {
                form: {
                    companyName: '',
                    username: '',
                    pwd: '',
                }
            }
        }
    },
    components: {},
    methods: {
        editorClick(){
            this.$router.push('/admin/index/a-annuce-editor')
        },
        submit(){
            addCompany(this.form).then(res => {
                //修改vuex companyList和totalCount
                this.addcompany(res.data)
            }).catch(err => {
                console.log(err);
            })
        },
        edit(){
            updateCompany(this.form).then(res => {
                if(res.code === 0){
                    this.$router.back()
                }
                
            }).catch(err => {
                console.log(err);
                
            })
        },
        ...mapActions([
            'addcompany'
        ])
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
.check
    padding 20px
    background-color #fff
    .back
        margin 10px 0
        i
            font-size 32px
            cursor pointer
            &.editor
                color $bg-color
                float right
    .title
        margin 20px 0
        h1
            font-size 20px
            text-align center
    .main
        width 100%
    .bottom
        p
            font-size 14px
            color #666
            text-align right 
</style>
