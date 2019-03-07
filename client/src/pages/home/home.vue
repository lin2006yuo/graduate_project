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
            :send-flag="login"
        />
        <!-- <footer></footer> -->
    </div>
</template>

<script type="text/ecmascript-6">
import Navgator from 'components/navigator/navigator'
import BasicVueChat from 'components/basic-vue-chat/BasicVueChat.vue'
import { mapGetters, mapActions } from 'vuex'

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
            ],
            login: false
        };
    },
    computed: {
        ...mapGetters([
            'studentInfo',
            'companyInfo'
        ])
    },
    mounted() {
            setTimeout(() => {
                if(this.studentInfo._id || this.studentInfo._id) {
                    this.login = true
                }
            }, 200)
    },
    methods: {
        ...mapActions([
           'sendMsg' 
        ]),
        send(message) {
            if(!this.login) return this.$message('请登录...')
            const from = this.studentInfo._id
            // @MOCK to:5ba0a1bd986c8b4fa4eb86bb
            const to = '5ba0a1bd986c8b4fa4eb86bb'
                this.sendMsg({
                    from,
                    to,
                    content: message
                })
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
