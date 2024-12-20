module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + "Realtime Group Chat App",
    title: "Realtime Group Chat App",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/socket.client.js" },
    { src: "~/plugins/vuetify.js" },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa"],

  pwa: {
    manifest: {
      name: "Realtime Group Chat App",
      short_name: "Group ChatApp",
      start_url: "/",
      theme_color: "#424242",
      display: "standalone",
    },
    icon: {
      iconSrc: "./static/icon.png",
    },
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
  telemetry: true,
};
