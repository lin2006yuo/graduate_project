<template>
    <div class="home">
        <navgator></navgator>
        <keep-alive >
            <router-view></router-view>
        </keep-alive>
        <basic-vue-chat 
            class="chat" 
            :new-message="message" 
            :initial-feed="feed"
            @newOwnMessage="send"
        />
        <!-- <footer></footer> -->
    </div>
</template>

<script type="text/ecmascript-6">
import Navgator from 'components/navigator/navigator'
import BasicVueChat from 'components/basic-vue-chat/BasicVueChat.vue'
import { mapState } from 'vuex'

export default {
    data() {
        return {
            message: {
                
            },
            feed: [
                {
                id: 0,
                author: 'Person',
                contents: 'hi there',
                date: '16:30'
                },
                {
                id: 1,
                author: 'Me',
                contents: 'hello',
                date: '16:30'
                }
            ]
        };
    },
    computed: {
        ...mapState({
            student: state => state.front.student,
            company: state => state.front.company
        })
    },
    methods: {
        send() {
            if(!this.student._id && !this.company._id) return this.$message('请登录...')
            if(this.student._id && !this.company._id) {
                
            }
        }
    },
    components: {
        Navgator,BasicVueChat
    }
};
</script>

<style scoped lang="stylus">
.home
    height 100%
    background-color #fafafa
.chat 
    position fixed
    bottom 0
    right 0
    z-index 500
    // transform translate3d(0, 90%, 0)
footer {
    margin-top 50px
    height 100px
}
        
</style>
