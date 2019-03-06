<template>
    <div class="cv">
        <div class="cv-main" v-show="studentInfo.hasJl">
            <div class="top" @click="curIndex">
                <span :class="{active : NavCurIndex == 0}" data-index="0">基本资料</span>
                <span :class="{active : NavCurIndex == 1}" data-index="1">教育经历</span>
                <span :class="{active : NavCurIndex == 2}" data-index="2">求职意向</span>
                <span :class="{active : NavCurIndex == 3}" data-index="3">专业/技能</span>
            </div>
            <span class="line"></span>
            <div class="container">
                <div class="wrapper" ref="wrapper">
                    <el-form class="cv-form" :model="form" label-width="80px" v-if="form.studentId">
                        <div class="base">
                            <el-form-item label="姓名">
                                <el-input v-model="form.studentId.name" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" >
                                <el-radio-group v-model="form.studentId.sex" :disabled="true">
                                    <el-radio :label=1>男</el-radio>
                                    <el-radio :label=0>女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="出生年月" :disabled="true">
                                <el-date-picker :disabled="true" type="date" placeholder="选择日期" v-model="form.studentId.birthday" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            <el-form-item label="民族">
                                <el-select v-model="form.studentId.ethnic" placeholder="请选择" :disabled="true">
                                    <el-option
                                    v-for="item in options"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="籍贯">
                                <el-cascader
                                    v-model="form.studentId.city"
                                    :disabled="true"
                                    expand-trigger="hover"
                                    :props="cityFormat"
                                    :options="casOptions"                      
                                    @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="电话号码">
                                <el-input v-model="form.studentId.phone" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ">
                                <el-input v-model="form.studentId.QQ" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="电子邮箱">
                                <el-input v-model="form.studentId.eMail" :disabled="true"></el-input>
                            </el-form-item>
                        </div>
                        <div class="edu">
                            <el-form-item label="学历">
                                <el-select v-model="form.edu" placeholder="请选择">
                                <el-option
                                v-for="item in edu"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                                </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="专业">
                                <el-input v-model="form.studentId.major" :disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="是否学生干部" label-width="100px">
                                <el-select v-model="form.isT" placeholder="请选择">
                                <el-option
                                v-for="item in [{value:true,label:'是'},{value:false,label:'否'}]"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="职位" >
                                <el-input v-model="form.posi"></el-input>
                            </el-form-item>
                            <el-form-item label="成绩排名">
                                <el-select v-model="form.rank" placeholder="请选择">
                                <el-option
                                v-for="item in rank"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="expect">
                            <el-form-item label="期待工作地" label-width="100px">
                                <el-cascader
                                    v-model="form.excepCity"
                                    expand-trigger="hover"
                                    :props="cityFormat"
                                    :options="casOptions"                      
                                    @change="handleChange">
                                </el-cascader>
                            </el-form-item>
                            <el-form-item label="期待薪酬" label-width="100px">
                                <el-select v-model="form.excepMon" placeholder="请选择">
                                <el-option
                                v-for="item in Money"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                                </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="skill">
                            <el-form-item label="证书">
                                <el-input v-model="form.certificate"></el-input>
                            </el-form-item>
                            <el-form-item label="语言技能">
                                <el-select v-model="form.lang.name" placeholder="请选择">
                                    <el-option
                                    v-for="item in lang"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label">
                                    </el-option>
                                </el-select>
                                <el-input style="width:80px" placeholder="分数" v-model="form.lang.score"></el-input>
                            </el-form-item>
                            <el-form-item label="专业技能描述" label-width="100px">
                                <el-input
                                type="textarea"
                                :rows="8"
                                placeholder="请输入内容"
                                v-model="form.textarea">
                                </el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <el-button type="primary" @click="updateJl">保存</el-button>
            </div>
        </div>
        <div class="j-container" v-show="!studentInfo.hasJl">
            <div class="btn">
                <p class="text">还未创建简历,点击创建简历</p>
                <el-button type="primary" @click="createJl">创建简历</el-button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getProvince, createJl, updateStudentInfo, updateJl, getJl} from 'api/front'
import{mapGetters, mapMutations} from 'vuex'
import {Loading} from 'element-ui'

export default {
    data() {
        return {
            form: {},
            // form: {
            //     edu: '',
            //     isT: '',
            //     posi: '',
            //     rank: '',
            //     excepCity: [],
            //     excepMon:'',
            //     certificate: '',
            //     lang: {},
            //     textarea: ''
            // },
            NavCurIndex: 0,
            options: [
                '汉族','满族','维吾尔族','回族','壮族','苗族'
            ],
            casOptions: [],
            cityFormat: {
                value: 'name',
                label: 'name',
                children: 'pro'
            },
            edu: [
                { value: 'zhuanke', label: '专科' },
                { value: 'benke', label: '本科' },
                { value: 'shuoshi', label: '硕士' },
                { value: 'boshi', label: '博士' },
            ],
            rank: [
                { value: '1', label: '前5%' },
                { value: '2', label: '前10%' },
                { value: '3', label: '前30%' },
                { value: '4', label: '前50%' },
            ],
            Money: [
                { value: '1', label: '3000以上' },
                { value: '2', label: '4000以上' },
                { value: '3', label: '5000以上' },
                { value: '4', label: '6000以上' }
            ],
            lang: [
                { value: '1', label: '大学英语四级' },
                { value: '2', label: '大学英语六级' },
                { value: '3', label: '托福' },
                { value: '4', label: '雅思' },
            ]
        };
    },
    created(){
    },
    mounted(){
        //获取省市
        getProvince().then(res => {
            this.casOptions = res.data
        }).catch(err => {
            console.log(err);  
        }) 
        //获取学生信息
        // setTimeout(() => {
        //     this._studentInfoInit()
        // }, 25);
        //获取简历信息   
        setTimeout(() => {
            if(this.studentInfo.hasJl){
            console.log(111);
            
            this._studentInfoInit()
        }
        }, 25);
    },
    components: {},
    computed: {
        ...mapGetters([
            'studentInfo'
        ])
    },
    methods: {
        updateJl(){
            let loading = Loading.service({fullscreen: true, text: '正在提交'})
            updateJl(this.form).then(res => {
                if(res.code === 0){
                    loading.close()
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                }else{
                    loading.close()
                    this.$message.error({
                        message: '修改失败',
                    })
                }             
            })
            
        },
        handleChange(){
            console.log(1);
            
        },
        createJl(){
            createJl().then(res => {
                if(res.code === 0){
                    //更新vuex
                    this.setStudentHasJl(true)
                    //创建成功，更新学生信息hasJl
                    updateStudentInfo(this.studentInfo)
                    this._studentInfoInit()
                }
            })
        },
        curIndex(e){
            this.NavCurIndex = e.target.dataset.index
            let wrapperStyle = this.$refs.wrapper.style 
            wrapperStyle.transform = `translate3d(-${this.NavCurIndex*600}px,0,0)`
        },
        _studentInfoInit(){
           getJl().then(res => {
               if(res.code === 0){
                   this.form = res.data
               }
               
           })
        },
        ...mapMutations({
            setStudentHasJl: 'SET_STUDENT_HASJL'
        })
}
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'
.cv
    text-align center
    .j-container
        height 600px
        overflow hidden
        .btn
            margin-top 150px
            .text
                line-height 60px
                font-size 20px
    .top
        clearfix()
        display inline-block
        padding-bottom 20px
        border-bottom 1px dashed #eaeaea
        span
            box-sizing border-box
            line-height 30px
            font-size 16px
            width 150px
            height 30px
            display block
            float left
            cursor pointer
            &.active
                font-size 18px
                font-weight bold
                color #ab4d72
    .container
        width 600px
        margin 20px auto 0
        overflow hidden
        position relative
        .wrapper
            width 2400px
            transition all .2s ease
            .cv-form
                text-align left  
                height 550px
                clearfix()
                .base
                .edu
                .expect
                .skill
                    height 100%
                    width 480px
                    margin-right 120px
                    float left
</style>
