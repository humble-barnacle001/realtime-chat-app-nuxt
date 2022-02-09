<template>
  <div>
    <CoolLightBox
      :items="images"
      :index="currentIndex"
      @close="currentIndex = null"
    />
    <div ref="chat" class="chat">
      <Message
        v-for="(message, index) in messages"
        :key="`message-${index}`"
        :index="index"
        :message="message"
        :owner="message.id === user.id"
        :ownercolor="randomColor(message.id)"
        @clicked="handleImageClick"
      />
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import { mapState } from "vuex";
import Message from "@/components/Message";

export default {
  name: "ChatPage",
  components: {
    Message,
    CoolLightBox,
  },
  data: () => ({
    colorCache: {},
    images: [],
    currentIndex: null,
  }),
  computed: {
    ...mapState(["user", "messages"]),
  },
  watch: {
    messages() {
      setTimeout(() => {
        if (this.$refs.chat) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        }
      }, 0);
      this.images = this.messages
        .filter((msg) => msg.isImage)
        .map((msg) => msg.text);
    },
  },
  methods: {
    randomColor(id) {
      const r = () => Math.floor(200 * Math.random()) + 56;
      return (
        this.colorCache[id] ||
        (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`)
      );
    },
    handleImageClick(index) {
      this.currentIndex = this.messages.reduce(
        (i, msg, mind) => (msg.isImage ? (mind < index ? i + 1 : i) : i),
        0,
      );
    },
  },
};
</script>

<style src="vue-cool-lightbox/dist/vue-cool-lightbox.min.css">
</style>
<style scoped>
.chat {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
  color: #000;
}
</style>
