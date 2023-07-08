import type { List } from "@/types/types";
const { addNewFirebaseDocument, subscribeToFirebaseCollection } =
  useFirebaseDb();

import { useUserStore } from "./userStore";

interface State {
  lists: List[];
  unsubscribe: any;
}

export const useListsStore = defineStore("useListsStore", {
  state: (): State => ({
    lists: [],
    unsubscribe: null,
  }),

  actions: {
    async subscribeToListsCollection() {
      const userStore = useUserStore();

      const res = await subscribeToFirebaseCollection<List>(
        `users/${userStore.user?.uid}/lists`,
        "createdAt"
      );

      await new Promise((r) => setTimeout(r, 300)); // FIXME This is a temporary hack!

      this.lists = res!.arr;
      this.unsubscribe = res!.unSub;
    },
  },
});
