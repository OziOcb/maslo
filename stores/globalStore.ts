interface State {
  isDrawerOpen: boolean;
}

export const useGlobalStore = defineStore("useGlobalStore", {
  state: (): State => ({
    isDrawerOpen: false,
  }),

  persist: true,
});
