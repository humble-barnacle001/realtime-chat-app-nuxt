<template>
  <v-row justify="center" no-gutters>
    <p v-if="isSystemMessage" class="text-center font-italic system">
      {{ message.text }}
    </p>
    <v-col v-else class="msg-wrapper">
      <v-row
        no-gutters
        justify="space-between"
        class="msg flex-column"
        :class="{ owner }"
      >
        <v-col>
          <span
            v-if="!owner"
            class="font-weight-bold subtitle-1"
            :style="{ color: ownercolor }"
          >
            {{ message.name }}
          </span>
          <p class="mb-0 text-center">
            <span v-if="isTextMessage" class="text-left d-block">
              <span>
                {{ message.text }}
              </span>
            </span>
            <v-img
              v-else-if="isUploaded"
              contain
              :src="message.text"
              class="hover"
              @click="$emit('clicked', index)"
            />
            <v-progress-circular
              v-else
              color="#FFF388"
              size="100"
              width="10"
              :value="loadPercent"
            >
              {{ loadPercent }}
            </v-progress-circular>
          </p>
        </v-col>
        <v-col cols="auto" class="text-right">
          <span class="msg__date ml-3 caption">
            {{ new Date(message.time).toTimeString().slice(0, 8) }}
          </span>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    message: {
      type: Object,
      default: () => {},
    },
    owner: {
      type: Boolean,
    },
    ownercolor: {
      type: String,
      required: true,
    },
  },
  computed: {
    isSystemMessage() {
      return this.message.name === "admin";
    },
    isTextMessage() {
      return !this.message.isImage;
    },
    isUploaded() {
      return this.message.uploadProgress === 1 && !!this.message.text;
    },
    loadPercent() {
      return Math.round(this.message.uploadProgress * 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.system {
  margin-bottom: 1rem;
  color: #fff;

  p {
    margin-bottom: 1rem;
  }
}

.hover:hover {
  cursor: pointer;
}

.msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg {
  padding: 1rem;
  width: 40%;
  margin: 0 1rem;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: #202c33;
  color: #cddcdb;
  position: relative;
  word-break: break-all;
  margin-bottom: 1rem;

  &__date {
    color: #8ab4ac;
  }
}

.owner {
  background: #005c4b;
  align-self: flex-end;
}

@media (max-width: 769px) {
  .msg {
    width: 60%;
  }
}

@media (max-width: 400px) {
  .msg {
    width: 90%;
  }
}
</style>
