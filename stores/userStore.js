export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    populateUserData(userData) {
      this.user = userData;
    },
  },
});
