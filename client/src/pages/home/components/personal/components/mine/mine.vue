<template>
    <div class="mine">
        <div class="title">
            <span class="line"></span>
            <h1>基本信息</h1>
        </div>
        <div class="main">
            <el-form class="el-form" :model="form" label-width="80px">
               <el-form-item label="id" v-show="false">
                   <el-input v-model="form._id"></el-input>
               </el-form-item>
                <el-form-item label="姓名" >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="性别" >
                    <el-radio-group v-model="form.sex">
                        <el-radio label="1">男</el-radio>
                        <el-radio label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生年月">
                    <el-date-picker  type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="民族">
                    <el-select v-model="form.ethnic" placeholder="请选择">
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
                        v-model="form.city"
                        expand-trigger="hover"
                        :props="cityFormat"
                        :options="casOptions"                      
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="学院">
                    <el-select v-model="form.academy" placeholder="请选择" value="大一">
                        <el-option
                        v-for="item in academys"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业">
                    <el-select v-model="form.grade" placeholder="请选择" style="width:80px">
                        <el-option
                        v-for="item in ['大一','大二','大三','大四',]"
                        :key="item"
                        :label="item"
                        :value="item">
                        </el-option>
                    </el-select>
                    <el-input v-model="form.major" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="QQ">
                    <el-input v-model="form.QQ"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱">
                    <el-input v-model="form.eMail"></el-input>
                </el-form-item>
                 <el-form-item>
                     <el-button type="primary" @click="updateInfo">修改</el-button>
                 </el-form-item>
            </el-form>
            <!-- 提示框 -->
            <!-- <el-button :plain="true"></el-button> -->
            <!-- loading -->
            <!-- <el-button
                type="primary"
                
                v-loading.fullscreen.lock="fullscreenLoading">
            </el-button> -->
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { getStudentInfo, getProvince, getCityById,uodateStudentInfo} from 'api/front'
import {mapGetters, mapMutations} from 'vuex'
import {Loading} from 'element-ui'
export default {
    data() {
        return {
            form: {
                _id: '',
                name: '',
                sex: '',
                birthday: '',
                ethnic: '',
                city: [],
                phone: '',
                QQ: '',
                eMail:'',
                major: '',
                academy: '',
                grade: ''
            },
            test: this.$store.state.front.student.name,
            options: [
                '汉族','满族','维吾尔族','回族','壮族','苗族'
            ],
            casOptions: [],
            cityFormat:{
                value: 'name',
                label: 'name',
                children: 'pro'
            },
            academys: [
                '英东生命科学学院','英东农业科学与工程学院','英东食品科学与工程学院','物理与机电工程学院',
                '信息科学与工程学院','文学院','外语学院',
                '化学与环境工程学院','经济管理学院','政治与公共事务管理学院','法学院',
                '数学与统计学院','教育学院','美术与设计学院','音乐学院',
                '旅游与地理学院','土木工程学院',
            ],
        }
    },
    mounted(){
        getProvince().then(res => {
            this.casOptions = res.data
        }).catch(err => {
            console.log(err);  
        })    
        this._studentInfoInit()
          
    },
    watch: {
        studentInfo(){
            this._studentInfoInit()
        }
    },
    computed: {
        ...mapGetters([
            'studentInfo'
        ]),
    },
    components: {},
    methods: {
        updateInfo(){
            let studentForm = this.form
            studentForm.hasJl = this.studentInfo.hasJl
            //打开loadding
            let loading = Loading.service({fullscreen: true,text: '正在提交'})

            uodateStudentInfo(studentForm).then(res => {
                if(res.code === 0){
                    //关闭loading
                    loading.close();
                    // 弹出提示
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    })
                    //提交vuex
                    this.setStudent(studentForm)
                }else if(res.code === 2){
                    this.$message.error({
                        message: '提交失败,请登陆后再操作',
                    })
                    loading.close()
                    console.log('提交失败');
                }else{
                    this.$message.error({
                        message: '提交失败'
                    })
                    loading.close()
                }
            })
        },
        handleChange(){
            console.log(1);
            
        },
        _studentInfoInit(){
            this.form._id = this.studentInfo._id
            this.form.name = this.studentInfo.name
            this.form.sex = this.studentInfo.sex + ""
            this.form.birthday = this.studentInfo.birthday
            this.form.ethnic = this.studentInfo.ethnic
            this.form.city = this.studentInfo.city
            this.form.phone = this.studentInfo.phone
            this.form.QQ = this.studentInfo.QQ
            this.form.eMail = this.studentInfo.eMail
            this.form.major = this.studentInfo.major
            this.form.academy = this.studentInfo.academy
            this.form.grade = this.studentInfo.grade
        },
        ...mapMutations({
            setStudent: 'SET_STUDENT'
        })
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'
.mine
    width 100%
    // padding 40px 20px
    .title
        height 40px
        margin-bottom 40px
       .line
           display inline-block
           width 4px
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
