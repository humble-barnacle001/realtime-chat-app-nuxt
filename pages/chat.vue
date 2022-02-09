<template>
  <div class="chat-wrapper">
    <Snackbar v-model="snackbar" :text="customMessage" :timeout="timeout" />
    <div ref="chat" class="chat">
      <Message
        v-for="(message, index) in messages"
        :key="`message-${index}`"
        :message="message"
        :owner="message.id === user.id"
        :ownercolor="randomColor(message.id)"
      />
    </div>
    <div v-if="typingUsers.length" class="chat__typing">
      <p
        v-for="(typingUser, index) in typingUsers"
        :key="`typingUser-${index}`"
        class="chat__typing-user"
      >
        {{ typingUser.name }} is typing...
      </p>
    </div>
    <div class="chat__form">
      <ChatForm @alert="handleAlert" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Message from "@/components/Message";
import ChatForm from "@/components/ChatForm";
import Snackbar from "@/components/Snackbar";

export default {
  name: "ChatPage",
  layout: "chat",
  components: {
    Message,
    ChatForm,
    Snackbar,
  },
  data: () => ({
    snackbar: false,
    timeout: 2000,
    customMessageText: "",
    colorCache: {},
  }),
  computed: {
    ...mapState(["user", "messages", "users"]),
    ...mapGetters(["typingUsers"]),
    customMessage() {
      return this.customMessageText;
    },
  },
  watch: {
    messages() {
      setTimeout(() => {
        if (this.$refs.chat) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        }
      }, 0);
    },
  },
  methods: {
    handleAlert(message) {
      this.customMessageText = message;
      this.snackbar = true;
      setTimeout(() => (this.snackbar = false), this.timeout);
    },
    randomColor(id) {
      const r = () => Math.floor(200 * Math.random()) + 56;
      return (
        this.colorCache[id] ||
        (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`)
      );
    },
  },
  head() {
    return {
      title: `Room ${this.user.room}`,
    };
  },
};
</script>

<style scoped>
.chat-wrapper {
  height: 100%;
  position: relative;
  overflow: hidden;
}

.chat__form {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  height: 80px;
}

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

.chat__typing {
  position: absolute;
  display: flex;
  bottom: 50px;
}

.chat__typing-user:not(first-child) {
  margin-left: 15px;
}
</style>
