import type { List, ObjectOfLists } from "@/types/types";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
  Unsubscribe,
} from "firebase/firestore";
const { addNewFirebaseDocument, deleteFirebaseDocument } = useFirebaseDb();

interface State {
  lists: ObjectOfLists;
  unsubscribe: Unsubscribe | null;
}

export const useListsStore = defineStore("useListsStore", {
  state: (): State => ({
    lists: {},
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
          const obj: ObjectOfLists = {};
          snap.forEach((doc) => {
            obj[doc.id] = { ...(doc.data() as List), id: doc.id };
          });
          this.lists = obj;
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
      const res = await addNewFirebaseDocument(
        `users/${currentUserUid}/lists`,
        listObj
      );
      return res;
    },

    async deleteList(listId: string) {
      const { $auth } = useNuxtApp();
      const currentUserUid = $auth.currentUser?.uid;
      await deleteFirebaseDocument(`users/${currentUserUid}/lists`, listId);
    },
  },
});
