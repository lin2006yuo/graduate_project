<template>
    <div class="personal">
        <div class="top-bg"></div>
        <div class="wrapper">
        <my-upload 
            field="img"
            @crop-success="cropSuccess"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="showAvatar"
            :width="300"
            :height="300"
            :params="params"
            :headers='headers'
            url="http://localhost:3000/front/modifyAvatar"
            img-format="png"></my-upload>
            <div class="left">
                <div class="info">
                    <div class="avator">
                        <img :src='avatarUrl' alt="" @click="showAvatar = true">                  </div>
                    <span class="name">{{studentInfo.name}}</span>
                    <span class="academy">{{studentInfo.academy}}</span>
                    <span class="profes">{{grade}}{{studentInfo.major}}</span>
                    <span class="name">{{companyInfo.companyName}}</span>
                </div>
                <div class="menu">
                    <ul class="menulist" @mouseover="hover" v-show="!isCompany">
                        <span class="bar" ref="bar"></span>
                        <li class="item"><router-link :class="{cur: $route.name === 'Mine'}" to="/personal/mine" data-index="0">我的资料</router-link></li>
                        <li class="item"><router-link :class="{cur: $route.name === 'CV'}" to="/personal/cv" data-index="1">简历管理</router-link></li>
                        <li class="item"><router-link :class="{cur: $route.name === 'Result'}" to="/personal/result" data-index="2">网申记录</router-link></li>
                        <li class="item"><router-link :class="{cur: $route.name === 'Account'}" to="/personal/account" data-index="3">账户管理</router-link></li>
                    </ul>
                    <ul class="menulist" @mouseover="cHover" v-show="isCompany">
                        <span class="bar" ref="cBar"></span>
                        <li class="item"><router-link :class="{cur: $route.name === 'ComMine'}" to="/personal/com-mine" data-index="0">企业资料</router-link></li>
                        <li class="item"><router-link :class="{cur: $route.name === 'ComPulish'}" to="/personal/com-pulish" data-index="1">发布招聘</router-link></li>
                        <li class="item"><router-link :class="{cur: $route.name === 'ComRecruit'}" to="/personal/com-recruit" data-index="2">招聘管理</router-link></li>
                        <li class="item"><router-link :class="{cur: $route.name === 'ComCv'}" to="/personal/com-cv" data-index="3">简历管理</router-link></li>
                        <li class="item"><router-link :class="{cur: $route.name === 'Account'}" to="/personal/account" data-index="4">账户管理</router-link></li>
                    </ul>
                </div>
            </div>
            <div class="right">
                    <router-view></router-view>
            </div>
        </div>
        <div class="debug" @click="debug">切换企业账号</div>
    </div>
</template>

<script type="text/ecmascript-6">
import { getUserInfo } from 'api/front'
import {mapMutations, mapGetters} from 'vuex'
import myUpload from 'vue-image-crop-upload';

export default {
    data() {
        return {
            isCompany: false,
            showAvatar: false,
            params: {
                id: "",
                isCompany: ""
            },
            headers: { id: '' },
            imgDataUrl: ''
        };
    },
    components: { myUpload },
    mounted() {    
        getUserInfo().then(res => {
            if(res.code === 1){
                this.$router.push({name: 'Login'})
            }else{
                //公司
                if(res.flag){
                    this.setCompany(res.data)
                    this.isCompany = true
                }else{
                    this.setStudent(res.data)
                    this.isCompany = false
                }
            }
            
        }).catch(err => {
            console.log(err);
            
        })
    },
    computed: {
        ...mapGetters([
            'studentInfo',
            'companyInfo'
        ]),
        grade(){
            let str = this.studentInfo.grade
            if(str === '大一'){
                return new Date().getFullYear() - 2000
            }else if(str === '大二'){
                return new Date().getFullYear() - 2001
            }else if(str === '大三'){
                return new Date().getFullYear() - 2002
            }else if(str === '大四'){
                return new Date().getFullYear() - 2003
            }

        },
        avatarUrl() {
            const Regx = /data:image/i
            const info = this.isCompany ? this.companyInfo : this.studentInfo
            return Regx.test(info.avatar) ?  info.avatar : `http://${info.avatar}`
        }
    },
    methods: {
        hover(e){     
            let index = e.target.dataset.index        
            if(index){
                let barStyle = this.$refs.bar.style
                barStyle.transform = `translate3d(0,${index*60}px,0)`   
            }
        },
        cHover(e){
            let index = e.target.dataset.index        
            if(index){
                let barStyle = this.$refs.cBar.style
                barStyle.transform = `translate3d(0,${index*60}px,0)`   
            }
        },
        debug(){
            this.isCompany = !this.isCompany
        },
        ...mapMutations({
            setStudent: 'SET_STUDENT',
            setCompany: 'SET_COMPANY'
        }),
        cropSuccess(imgDataUrl) {
            const info = this.isCompany ? this.companyInfo : this.studentInfo
            this.params.id = info._id
            this.params.isCompany = this.isCompany
            this.headers.id = info._id
            this.imgDataUrl = imgDataUrl
        },
        cropUploadSuccess(jsonData, field) {
            const info = this.isCompany ? this.companyInfo : this.studentInfo
            const retInfo = { ...info }
            retInfo.avatar = this.imgDataUrl
            this.isCompany ? this.setCompany(retInfo) : this.setStudent(retInfo)
        },
        cropUploadFail() {

        }
    }
};
</script>

<style scoped lang="stylus">
@import '~assets/css/mixin.styl'
@import '~assets/css/variable.styl'
.personal
    width 100%
    background-color #f6f6f6
    height 100%
    position absolute
    top 0
    .top-bg {
        height 80px
        width 100%
        position absolute
        left 0
        top 0
        background center center / cover url("~@/assets/img/bg_1.png")
        z-index 100
    }
    .debug
        position fixed
        left 20px
        top 60%
        background-color #999
        cursor pointer
    .wrapper
        width 1120px
        margin 0 auto
        padding-top 100px
        clearfix()
        .left
            float left
            width 25%
            .info
                background-color #fff
                padding 10px 20px
                text-align center
                .avator
                    width 100%
                    img
                        width 100px
                        cursor pointer
                        border-radius 50%
                .name
                .academy
                .profes
                    display block
                    color #666
                    font-size 12px
                    margin 5px 0
                .name
                    font-size 16px
            .menu
                margin-top 20px
                background-color #fff
                .bar
                    position absolute
                    left 0
                    top 0
                    width 3px
                    height 60px
                    background #ab4d72
                    border-radius 3px
                    transition all .2s ease
                .menulist
                    width 100%
                    position relative
                    .item
                        height 60px
                        line-height 60px
                        text-align center 
                        a
                            display block
                            font-size 14px
                            &:hover
                                color #ab4d72
                            &.cur
                                background-color #ab4d72
                                color #fff
        .right
            float right
            width 74%
            background-color #ffffff
            box-sizing border-box
            padding 25px 20px 20px
            clearfix()
</style>
