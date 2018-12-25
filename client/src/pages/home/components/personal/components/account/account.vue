<template>
    <div class="account">
        <div class="title">
            <span class="line"></span>
            <h1>账户管理</h1>
        </div>
        <div class="main">
            <el-form style="width:400px" ref="ruleForm2" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="原密码">
                    <el-input v-model="form.oldpwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pwd">
                    <el-input v-model="form.newpwd"></el-input>
                </el-form-item>
                <el-form-item label="重新输入" prop="checkpwd">
                    <el-input v-model="form.checkpwd"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.newpwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            form: {
                oldpwd: '',
                newpwd: '',
                checkpwd: ''
            },
            rules: {
                checkpwd: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        };
    },
    components: {},
    methods: {
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'
.account
    width 100%
    // padding 40px 20px
    .title
        height 40px
        padding-bottom 20px
        margin-bottom 20px
        border-bottom 1px dashed #eaeaea
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
</style>
