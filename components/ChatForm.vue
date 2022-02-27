<template>
  <v-form ref="form" @submit.prevent="send">
    <v-text-field
      v-model="text"
      label="Message..."
      outlined
      :rules="rules"
      :prepend-icon="mode"
      :prefix="modeText"
      append-icon="mdi-paperclip"
      @input="typing"
      @click:append="handleFileImport"
      @click:prepend="setPrefixIcon"
      @blur="resetValidation"
    />
    <input
      ref="uploader"
      class="d-none"
      type="file"
      accept="image/*"
      @change="onFileChanged"
    />
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    clientID: "db3735c6349c83f",
    text: "",
    isSelecting: false,
    selectedFile: null,
    rules: [(v) => !!v || "Text is required"],
    mode: "mdi-radiobox-blank",
    modeText: "",
  }),
  computed: {
    ...mapGetters(["typingStatus"]),
  },
  methods: {
    ...mapActions([
      "createMessage",
      "setTypingStatus",
      "createImageMessage",
      "removeMessage",
    ]),
    isBroadcast() {
      return this.mode === "mdi-radiobox-marked";
    },
    setPrefixIcon({ disable = false }) {
      if (!disable && !this.isBroadcast()) {
        this.mode = "mdi-radiobox-marked";
        this.modeText = "Broadcast: ";
      } else {
        this.mode = "mdi-radiobox-blank";
        this.modeText = "";
      }
    },
    send() {
      if (this.$refs.form.validate()) {
        this.createMessage({
          msg: this.text,
          isImage: false,
          isBroadcast: this.isBroadcast(),
        });
        this.text = "";
        this.setPrefixIcon({ disable: true });
        this.resetValidation();
      }
    },
    resetValidation() {
      this.setTypingStatus(false);
      this.$refs.form.resetValidation();
    },
    typing() {
      if (!this.typingStatus) {
        this.setTypingStatus(true);
      }
    },
    handleFileImport() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true },
      );
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      const imgKey = Date.now() + Math.random().toString().replace(".", "");
      this.createImageMessage({ uploaded: 0, key: imgKey });
      this.selectedFile = e.target.files[0];
      e.target.value = "";
      const formData = new FormData();
      formData.append("image", this.selectedFile);
      // Do whatever you need with the file, liek reading it with FileReader
      axios
        .post("/image", formData, {
          baseURL: "https://api.imgur.com/3",
          headers: {
            Authorization: `Client-ID ${this.clientID}`,
          },
          onUploadProgress: (e) =>
            this.createImageMessage({
              uploaded: e.loaded / e.total,
              key: imgKey,
            }),
        })
        .then((response) => {
          this.createImageMessage({ uploaded: 1, key: imgKey });
          this.createMessage({ msg: response.data.data.link, isImage: true });
        })
        .catch((e) => {
          let alertText = "Upload failed";
          alertText +=
            !!e.response.data &&
            !!e.response.data.data &&
            !!e.response.data.data.error &&
            !!e.response.data.data.error.message &&
            ": " + e.response.data.data.error.message;
          this.$emit("alert", alertText);
        })
        .finally(() => this.removeMessage(imgKey));
    },
  },
};
</script>
