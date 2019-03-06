<template>
    <div class="chator-list">
        <div class="chator">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551712864263&di=97d9f8ff20f677cb513caf569ca54ea2&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201410%2F02%2F20141002212239_zWR55.jpeg" alt="">
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

