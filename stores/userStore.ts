import { User } from "firebase/auth";

interface State {
  user: User | null;
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    user: null,
  }),
});
