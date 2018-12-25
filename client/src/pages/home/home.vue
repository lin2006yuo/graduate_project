<template>
    <div class="home">
        <navgator></navgator>
        <keep-alive >
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
import Navgator from 'components/navigator/navigator'

export default {
    data() {
        return {
        };
    },
    components: {
        Navgator,
    }
};
</script>

<style scoped lang="stylus">
.home
    height 100%
        
</style>
