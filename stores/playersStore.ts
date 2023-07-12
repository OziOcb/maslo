import type { PlayerObj, PlayerData } from "@/types/types";
const { addNewFirebaseDocument, deleteFirebaseDocument } = useFirebaseDb();
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  Unsubscribe,
} from "firebase/firestore";

interface State {
  players: PlayerObj[];
  unsubscribe: Unsubscribe | null;
}

export const usePlayersStore = defineStore("usePlayersStore", {
  state: (): State => ({
    players: [],
    unsubscribe: null,
  }),

  actions: {
    async addNewPlayer(currentListId: string, playerData: PlayerData) {
      const { $auth } = useNuxtApp();
      const currentUserUid = $auth.currentUser?.uid;

      const playerObj: PlayerObj = {
        createdAt: new Date(),
        inLists: [currentListId],
        data: {
          firstName: playerData.firstName,
          lastName: playerData.lastName,
        },
      };
      const res = await addNewFirebaseDocument(
        `users/${currentUserUid}/players`,
        playerObj
      );

      return res;
    },

    // 3. Display a list of players from this group (don't use onSnap)
    // 3b. Unsubscribe form this listener each time user switches between lists
    subscribeToPlayersCollection() {
      const { $firestore, $auth } = useNuxtApp();
      try {
        const q = query(
          collection($firestore, `users/${$auth.currentUser?.uid}/players`),
          orderBy("createdAt"),
          where("authorId", "==", $auth.currentUser?.uid)
        );
        const unSub = onSnapshot(q, (snap) => {
          const arr: PlayerObj[] = [];
          snap.forEach((doc) => {
            arr.push({ ...doc.data(), id: doc.id } as PlayerObj);
          });
          this.players = arr;
        });

        this.unsubscribe = unSub;
      } catch (e) {
        console.error("Error subscribing to collection with filter: ", e);
      }
    },

    unsubscribeFromPlayersCollection() {
      if (this.unsubscribe) this.unsubscribe();
    },

    // TODO: ENDED HERE!
    // 4. Add options for deleting players
    // 4b. When deleting list all of its players should be deleted as well
    // 5. Add options for filtering players (see [listId].vue line 26)

    // async deletePlayer(listId: string) {
    //   const { $auth } = useNuxtApp();
    //   const currentUserUid = $auth.currentUser?.uid;
    //   await deleteFirebaseDocument(`users/${currentUserUid}/lists`, listId);
    // },
  },
});
