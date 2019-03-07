<template>
  <div
    class="basic-vue-chat"
    :class="{show: show}"
    @click="setEmojiPickerToggle(false)">
    <section>
      <chator-list></chator-list>
    </section>
    <section class="window">
      <header @click="toggleShow" class="window__header__container">
        <slot name="header">
          {{ title }}
        </slot>
        <i class="iconfont el-icon-Downarrow arrow"></i>
      </header>
      <section
        id="window__messages__container"
        class="window__messages__container">
        <slot>
          <messages-list
            :feed="feed"
            :author-id="authorId"
            class="messages-list" />
        </slot>
      </section>
      <div class="window__input__container">
        <slot name="input-container">
          <input-container
            :toggle-emoji-picker="toggleEmojiPicker"
            @newOwnMessage="onNewOwnMessage"
            @openEmojiPicker="onOpenEmojiPicker"
          />
        </slot>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import { scrollToBottom } from '../../helpers/scroll.js'
import MessagesList from './messages/MessagesList.vue'
import InputContainer from './input/InputContainer.vue'
import ChatorList from './messages/ChatorList'

export default {
  name: 'BasicVueChat',
  components: {
    MessagesList,
    InputContainer,
    ChatorList
  },
  props: {
    title: {
      type: String,
      default: 'Team Maczan',
      required: false
    },
    initialAuthorId: {
      type: Number,
      default: 0,
      required: false
    },
    attachMock: {
      type: Boolean,
      default: false,
      required: false
    },
    initialFeed: {
      type: Array,
      default: function () {
        return []
      },
      required: false
    },
    newMessage: {
      type: Object,
      default: function () {
        return {}
      },
      required: false
    },
    sendFlag: false
  },
  data: function () {
    return {
      feed: [],
      authorId: 0,
      toggleEmojiPicker: false,
      show: true
    }
  },
  watch: {
    newMessage: function (newValue, oldValue) {
      this.pushToFeed(newValue)
      scrollToBottom()
    }
  },
  mounted () {
    if (this.attachMock) {
      import('./mocks/mock-messages-list.js')
        .then(mockData => {
          this.feed = mockData.default.feed
          this.setAuthorId(mockData.default.authorId)
        })
        .catch(error => {
          console.error('Failed to load mock data from file. ', error)
        })
    } else {
      this.feed = this.initialFeed
      this.authorId = this.initialAuthorId
    }
  },
  methods: {
    setEmojiPickerToggle (toggle) {
      this.toggleEmojiPicker = toggle
    },
    pushToFeed (element) {
      this.feed.push(element)
    },
    onNewOwnMessage (message, image, imageUrl) {
      if(!this.sendFlag) return this.$emit('newOwnMessage', message)
      const newOwnMessage = {
        id: this.authorId,
        contents: message,
        image: image,
        imageUrl: imageUrl,
        date: moment().format('HH:mm:ss')
      }

      this.pushToFeed(newOwnMessage)

      scrollToBottom()

      this.$emit('newOwnMessage', message)
    },
    onOpenEmojiPicker (toggle) {
      this.setEmojiPickerToggle(toggle)
    },
    toggleShow() {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/main.scss";
.basic-vue-chat {
  transform: translate3d(0, 90%, 0);
  transition: transform .35s;
  display: flex;
  .window {
    width: 350px;
  }
  &.show {
    transform: translate3d(0, 0, 0);
    .arrow {
      transform: rotate(0deg)
    }
  }
  header {
    cursor: pointer;
  }
  .arrow {
      margin-left: 100px;
      font-size: 28px;
      position: absolute;
      top: 6px;
      right: 13px;
      cursor: pointer;
      transform: rotate(-180deg)
  }
}
</style>
