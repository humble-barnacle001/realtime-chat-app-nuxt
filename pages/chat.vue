<template>
  <div class="chat-wrapper">
    <Snackbar v-model="snackbar" :text="customMessage" :timeout="timeout" />
    <ChatPage />
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
import ChatForm from "@/components/ChatForm";
import Snackbar from "@/components/Snackbar";
import ChatPage from "@/components/ChatPage";

export default {
  name: "Group",
  layout: "chat",
  components: {
    ChatForm,
    ChatPage,
    Snackbar,
  },
  data: () => ({
    snackbar: false,
    timeout: 2000,
    customMessageText: "",
  }),
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["typingUsers"]),
    customMessage() {
      return this.customMessageText;
    },
  },
  methods: {
    handleAlert(message) {
      this.customMessageText = message;
      this.snackbar = true;
      setTimeout(() => (this.snackbar = false), this.timeout);
    },
  },
  head() {
    return {
      title: `Group ${this.user.room}`,
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

.chat__typing {
  position: absolute;
  display: flex;
  bottom: 50px;
}

.chat__typing-user:not(first-child) {
  margin-left: 15px;
}
</style>
