<template>
  <v-snackbar :value="value" :timeout="timeout" top>
    {{ text }}
    <v-btn dark text @click="$emit('input', false)"> Close </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      default: 3000,
    },
  },
};
</script>
