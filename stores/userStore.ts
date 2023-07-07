import { User } from "firebase/auth";

interface State {
  user: User | null;
}

export const useUserStore = defineStore("useUserStore", {
  state: (): State => ({
    user: null,
  }),

  persist: true,
});
