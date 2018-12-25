<template>
    <div class="com-mine">
        <div class="title">
            <span class="line"></span>
            <h1>企业基本信息</h1>
        </div>
        <div class="main">
            <el-form class="el-form" :model="companyInfo" label-width="80px">
                <el-form-item label="公司名称" >
                    <el-input v-model="companyInfo.companyName"></el-input>
                </el-form-item>
                <el-form-item label="公司简介">
                    <el-input
                    type="textarea"
                    :autosize="{ minRows: 5, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="companyInfo.companyIntro">
                    </el-input>
                </el-form-item>
                <el-form-item label="公司位置">
                    <el-cascader
                        v-model="companyInfo.position"
                        :props="cityFormat"
                        expand-trigger="hover"
                        :options="casOptions"                      
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input type="text" placeholder="联系人" style="width:100px" v-model="companyInfo.contact"></el-input>
                    <el-input v-model="companyInfo.phone" style="width: 200px" placeholder="电话号码"></el-input>
                </el-form-item>
                 <el-form-item>
                     <el-button type="primary" @click="onSubmit">保存</el-button>
                 </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getProvince, updateCompany} from 'api/front'
import {mapMutations, mapGetters} from 'vuex'
import {Loading} from 'element-ui'

export default {
    data() {
        return {
            options: [
                '汉族','满族','维吾尔族','回族','壮族','苗族'
            ],
            casOptions: [],
            cityFormat: {
                value: 'name',
                label: 'name',
                children: 'pro'
            }
        };
    },
    components: {},
    mounted() {
        getProvince().then(res => {
            this.casOptions = res.data
        }).catch(err => {
            console.log(err);
            
        })
    },
    computed: {
        ...mapGetters([
            'companyInfo'
        ])
    },
    methods: {
        onSubmit(){
            let loading = Loading.service({fullscreen:true, text:'正在提交'})
            updateCompany(this.companyInfo).then(res => {
                if(res.code === 0){
                    loading.close()
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    //修改vuex
                    this.setCompany(this.companyInfo)
                }
                
            }).catch(err => {
                console.log(err);
                
            })
        },
        handleChange(){
            console.log(1);
            
        },
        ...mapMutations({
            setCompany: 'SET_COMPANY'
        })
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'
.com-mine
    width 100%
    // padding 40px 20px
    .title
        height 40px
        margin-bottom 40px
       .line
           display inline-block
           width 4px
           border-radius 5px
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
        padding 0 20px
        .el-form
            width 400px
</style>
