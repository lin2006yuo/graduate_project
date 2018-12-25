<template>
    <div class="index">
        <el-container>
            <el-header><h1 class="title">韶院|校招后台管理系统</h1></el-header>
            <el-container>
                <el-aside width="200px">
                    <ul class="list">
                        <li class="item"><i class="el-icon-tickets"></i><router-link to="/admin/index/a-annuce" class="link">校园公告</router-link></li>
                        <li class="item"><i class="el-icon-tickets"></i><router-link to="/admin/index/a-company" class="link">公司账号</router-link></li>
                        <li class="item"><i class="el-icon-tickets"></i><router-link to="/admin/index/a-setting" class="link">设置</router-link></li>
                        <li class="item"><i class="el-icon-tickets"></i><a href="javascript:;" @click="loginout" class="link">退出登陆</a></li>
                    </ul>
                </el-aside>
                <el-main>
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
import {mapMutations} from 'vuex'

export default {
    data() {
        return {};
    },
    components: {},
    methods: {
        loginout(){
            this.delUser()
            this.$router.push('/admin/login')
        },
        ...mapMutations({
            delUser: 'DEL_USER'
        })
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/variable.styl'
@import '~assets/css/mixin.styl'
.index
    height 100%
    .el-header
        background-color: $bg-color
        color: #333;
        line-height: 60px; 
        .title
            font-size 18px
            font-weight bold
            color #fff
    .el-container
        height 100%
    .el-aside 
        background-color: #f4f4f4;
        color: #333;
        padding 20px
        .list
            .item
                height 40px
                line-height 40px
                font-size 16px
                &:hover
                    color $bg-color
                    .link
                        color $bg-color
                .link
                    margin-left  10px
                    display inline-block
    
    .el-main 
        background-color: #E9EEF3;
        color: #333;
</style>
