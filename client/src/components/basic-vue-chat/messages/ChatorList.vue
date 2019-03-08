<template>
    <div class="chator-list">
        <div class="chator" v-for="(item, index) in chatList" :key="`chator-${index}`">
            <img :src="`http://${item.avatar}`" alt="" @click="handleClick(item)">
            <i class="el-icon-error icon"></i>
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
        handleClick(item) {
            this.$emit('click', item)
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

