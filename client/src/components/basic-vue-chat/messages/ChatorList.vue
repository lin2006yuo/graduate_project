<template>
    <div class="chator-list">
        <div class="chator" v-for="(item, index) in chatList" :key="`chator-${index}`">
            <el-badge :is-dot="item.dot" class="item">
                <img :src="`http://${item.avatar}`" alt="" @click="handleClick(item, index)">
            </el-badge>
            <i @click="handleDelete(item, index)" class="el-icon-error icon"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ChatList',
    props: {
        chatorList: {
            type: Array,
            default: () => []
        },
        chatList: Array
    },
    methods: {
        handleClick(item, index) {
            this.$emit('click', item, index)
        },
        handleDelete(item, index) {
            this.$emit('delete', item)
        }
    }
}
</script>
<style lang="scss" scoped>
    .chator-list {
        width: 50px;
        height: 80%;
        background-color: blue;
        margin-top: 40px;
        border-radius: 10px;
        margin-right: 5px;
        background: linear-gradient(90deg, #6B63D8, #B284ED);
        display: flex;
        flex-direction: column;
        align-items: center;
        .chator {
            background-color: #fff;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            margin-top: 5px;
            cursor: pointer;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%
            }
            .icon {
                position: absolute;
                color: #4d3a9a;
                font-size: 12px;
                right: -6px;
                top: -2px;
                &:hover {
                    color: #fff
                }
            }
        }
    }
</style>

