const Message = require("../models/Message")();

export const state = () => ({
  user: {},
  messages: [],
  users: [],
});

export const getters = {
  typingUsers: ({ users, user }) =>
    users.filter(({ typingStatus, id }) => typingStatus && user.id !== id),
  typingStatus: ({ user }) => user.typingStatus,
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  SOCKET_newMessage(state, msg) {
    state.messages = [...state.messages, msg];
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  setTypingStatus(state, status) {
    state.user.typingStatus = status;
  },
  updateImageMessage(state, data) {
    const x = state.messages.find((message) => message.imageKey === data.key);
    if (x) x.uploadProgress = data.uploaded;
    else
      this.commit(
        "SOCKET_newMessage",
        new Message(
          state.user.name,
          "",
          true,
          state.user.id,
          data.uploaded,
          data.key,
        ),
      );
  },
  deleteMessage(state, key) {
    state.messages = state.messages.filter(
      (message) => message.imageKey !== key,
    );
  },
};

export const actions = {
  socketEmit(_, { action, payload }) {
    return this._vm.$socket.emit(action, payload);
  },
  createImageMessage({ commit }, data) {
    commit("updateImageMessage", data);
  },
  createMessage({ dispatch, state }, msg) {
    const { user } = state;
    const payload = {
      msg,
      id: user.id,
    };

    dispatch("socketEmit", {
      action: "createMessage",
      payload,
    });
  },
  removeMessage({ commit }, key) {
    commit("deleteMessage", key);
  },
  joinRoom({ dispatch, state }) {
    const { user } = state;

    dispatch("socketEmit", {
      action: "joinRoom",
      payload: user,
    });
  },
  leftRoom({ commit, dispatch }) {
    dispatch("socketEmit", {
      action: "leftChat",
      payload: null,
    });

    commit("clearData");
  },
  setTypingStatus({ dispatch, commit, state }, typingStatus) {
    commit("setTypingStatus", typingStatus);
    const { user } = state;
    dispatch("socketEmit", {
      action: "setTypingStatus",
      payload: user,
    });
  },
  async createUser({ commit, dispatch }, user) {
    const { id } = await dispatch("socketEmit", {
      action: "createUser",
      payload: user,
    });

    commit("setUser", { id, ...user });
  },
  SOCKET_reconnect({ state, dispatch }) {
    const { user } = state;
    if (Object.values(user).length) {
      const { id, ...userInfo } = user;
      dispatch("createUser", userInfo);
      dispatch("joinRoom");
    }
  },
};
