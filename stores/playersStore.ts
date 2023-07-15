import type { PlayerObj, PlayerData } from "@/types/types";
const { addNewFirebaseDocument, deleteFirebaseDocument } = useFirebaseDb();
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  orderBy,
  Unsubscribe,
  writeBatch,
} from "firebase/firestore";

import { faker } from "@faker-js/faker"; // REMOVE_ME:

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
          // firstName: playerData.firstName,
          // lastName: playerData.lastName,
          // age: playerData.age,
          firstName: faker.person.firstName(), // REMOVE_ME
          lastName: faker.person.lastName(), // REMOVE_ME
          age: faker.number.int({ max: 100 }), // REMOVE_ME
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

    // 4. Add options for deleting players
    async deletePlayer(playerId: string) {
      const { $auth } = useNuxtApp();
      const currentUserUid = $auth.currentUser?.uid;
      await deleteFirebaseDocument(`users/${currentUserUid}/players`, playerId);
    },

    // 4b. When deleting list all of its players should be deleted as well
    async deleteMultiplePlayers(playerIds: string[]) {
      const { $auth, $firestore } = useNuxtApp();
      const currentUserUid = $auth.currentUser?.uid;

      // NOTE: A batched write can contain up to 500 operations!
      const batch = writeBatch($firestore);
      playerIds.forEach((playerId) => {
        const docRef = doc(
          $firestore,
          `users/${currentUserUid}/players`,
          playerId
        );
        batch.delete(docRef);
      });

      await batch.commit();
    },

    // 5. Add options for filtering players (see [listId].vue line 26)
  },
});
