import type { List } from "@/types/types";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
  Unsubscribe,
} from "firebase/firestore";
const { addNewFirebaseDocument } = useFirebaseDb();

interface State {
  lists: List[];
  unsubscribe: Unsubscribe | null;
}

export const useListsStore = defineStore("useListsStore", {
  state: (): State => ({
    lists: [],
    unsubscribe: null,
  }),

  actions: {
    subscribeToListsCollection() {
      const { $firestore, $auth } = useNuxtApp();
      try {
        const q = query(
          collection($firestore, `users/${$auth.currentUser?.uid}/lists`),
          orderBy("createdAt"),
          where("authorID", "==", $auth.currentUser?.uid)
        );
        const unSub = onSnapshot(q, (snap) => {
          const arr: List[] = [];
          snap.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id } as List);
          });
          this.lists = arr;
        });

        this.unsubscribe = unSub;
      } catch (e) {
        console.error("Error subscribing to the Lists collection: ", e);
      }
    },

    unsubscribeFromListsCollection() {
      if (this.unsubscribe) this.unsubscribe();
    },

    async addNewList(newListName: string) {
      const { $auth } = useNuxtApp();
      const currentUserUid = $auth.currentUser?.uid;

      const listObj: List = {
        name: newListName,
        createdAt: Date.now(),
        allowedUsers: [currentUserUid],
      };
      await addNewFirebaseDocument(`users/${currentUserUid}/lists`, listObj);
    },
  },
});
