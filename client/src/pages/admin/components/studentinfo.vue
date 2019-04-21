<template>
    <div class="c-studentinfo"> 
        <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="基本信息" name="1">
                <div><label for="">姓名：</label><span>{{studentInfo.name}}</span></div>
                <div><label for="">性别：</label><span>{{studentInfo.sex === 1 ? '男' : '女'}}</span></div>
                <div><label for="">学院：</label><span>{{studentInfo.academy}}</span></div>
                <div><label for="">专业：</label><span>{{studentInfo.major}}</span></div>
                <div><label for="">民族：</label><span>{{studentInfo.ethnic}}</span></div>
                <div><label for="">年级：</label><span>{{studentInfo.grade}}</span></div>
                <div><label for="">手机号码：</label><span>{{studentInfo.phone}}</span></div>
                <div><label for="">出生日期：</label><span>{{new Date(studentInfo.birthday).toLocaleDateString()}}</span></div>
                <div><label for="">email：</label><span>{{studentInfo.eMail}}</span></div>
                <div><label for="">城市：</label><span>{{studentInfo.city[0]}} - {{studentInfo.city[1]}}</span></div>  
            </el-collapse-item>
            <el-collapse-item title="简历信息" name="2">
                <div v-if="!jlInfo._id">未完善简历</div>
                <div v-else>
                    <div><label for="">专业证书：</label><span>{{jlInfo.certificate}}</span></div>
                    <div><label for="">学历：</label><span>{{jlInfo.edu}}</span></div>
                    <div><label for="">期待工作地：</label><span>{{jlInfo.excepCity[0][0][0]}}|{{jlInfo.excepCity[0][0][1]}}</span></div>
                    <div><label for="">期待薪酬：</label><span>{{jlInfo.excepMon}}</span></div>
                    <div><label for="">是否学生干部：</label><span>{{jlInfo.isT ? '是' : '否'}}</span></div>
                    <div>
                        <label for="">语言技能：</label><span>{{jlInfo.lang.name}}</span>
                        <label for="">分数</label><span>{{jlInfo.lang.score}}</span>
                    </div>
                    <div><label for="">职位：</label><span>{{jlInfo.posi}}</span></div>
                    <div><label for="">成绩排名：</label><span>{{jlInfo.rank}}</span></div>
                    <div><label for="">专业描述：</label><span>{{jlInfo.textarea}}</span></div>
                </div>
            </el-collapse-item>
            <el-collapse-item title="招聘情况" name="3">
                <el-table
                :data="tableData"
                style="width: 100%">
                    <el-table-column
                        label="公司名称"
                        width="250">
                        <template slot-scope="scope">
                            <el-popover ref="myPopover" trigger="hover" placement="right" @show="popoverShow(scope.row)">
                                <div class="company-info">
                                    <div class="left">
                                        <img width="50" height="50" :src="`http://${companyInfo.avatar}`" alt="头像">
                                    </div>
                                    <div class="right">
                                        <div class="companyName">公司名称：</div>
                                        <div>{{companyInfo.companyName ? companyInfo.companyName : '暂未完善'}}</div>
                                        <div class="companyName">公司简介：</div>
                                        <div>{{companyInfo.companyIntro ? companyInfo.companyIntro : '暂未完善'}}</div>
                                        <div class="companyName">联系人：</div>
                                        <div>{{companyInfo.contact ? companyInfo.contact : '暂未完善'}}</div>
                                        <div class="companyName">联系电话：</div>
                                        <div>{{companyInfo.phone ? companyInfo.phone : '暂未完善'}}</div>
                                    </div>
                                </div>
                            </el-popover>
                            <span v-popover:myPopover class="click">{{scope.row.companyName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="简历状态"
                        :formatter="(row) => (!row.status ? '未通过' : (row.status === 1 ? '未审核' : '通过'))">
                    </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
import {getJl, getResumeById} from '@/api/front'
export default {
    data() {
        return {
            activeNames: ['1'],
            jlInfo: {},
            tableData: [],
            companyInfo: {},
        }
    },
    mounted() {
        this.getJlInfo()
        this.getResume()
    },
    methods: {
        getJlInfo() {
            getJl(this.studentInfo._id).then(res => {
                this.jlInfo = res.data ? res.data : {}
            })
        },
        getResume() {
            getResumeById(this.studentInfo._id).then(res => {
                this.tableData = res.data.map(i => ({...i.companyId, status: i.status}))
            })
        },
        popoverShow(company) {
            this.companyInfo = company
        },
        handleChange() {}
    },
    watch: {
        'studentInfo._id'() {
            this.getJlInfo()
            this.getResume()
        }
    },
    props: {
        studentInfo: {}
    },
}
</script>
<style lang="stylus">
.a-company .el-dialog__body {
    padding: 0 0 10px 20px;
}
.c-studentinfo .el-dialog__body {
    padding: 0 0 10px 20px;
}
.click {
  color: #409EFF;
  cursor: pointer;
}
.c-studentinfo .el-collapse {
    overflow-y: scroll;
    padding-right: 10px;
    height 450px
}
.company-info {
    display flex
    .left {
        width 80px
    }
    .right {
        .companyName {
            font-weight: bold;
            font-size: 13px;
            margin-top: 7px;
        }
    }
}
</style>