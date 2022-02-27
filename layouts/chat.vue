<template>
  <v-app style="background: #0b141a">
    <v-navigation-drawer
      v-model="drawer"
      app
      mobile-break-point="650"
      color="$accent"
    >
      <v-list subheader>
        <v-subheader>Users in group</v-subheader>

        <v-list-item
          v-for="({ name, id }, index) in users"
          :key="`user-${index}`"
          @click.prevent
        >
          <v-list-item-content>
            <v-list-item-title v-text="name" />
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="id === user.id ? 'primary' : 'grey'">
              mdi-account-circle-outline
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#424242">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>
        Group
        <v-chip color="grey">
          {{ user.room }}
        </v-chip>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon class="mx-1" @click="exit">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid style="height: 100%">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ChatLayout",
  data: () => ({
    drawer: false,
  }),
  computed: {
    ...mapState(["user", "users"]),
  },
  middleware: "auth",
  created() {
    this.joinRoom(this.user);
  },
  methods: {
    ...mapActions(["joinRoom", "leftRoom"]),
    exit() {
      this.leftRoom();
      this.$router.push("/?message=leftChat");
    },
  },
};
</script>
