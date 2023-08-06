import type { PlayerObj, PlayerData, sortDirections } from "@/types/types";
import { FootballPositionsAbbreviations } from "@/types/enums";
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

interface State {
  players: PlayerObj[];
  searchFor: string;
  sortBy: keyof PlayerData | "";
  sortDirection: sortDirections;
  filerByPosition: FootballPositionsAbbreviations;
  unsubscribe: Unsubscribe | null;
}

export const usePlayersStore = defineStore("usePlayersStore", {
  state: (): State => ({
    players: [],
    searchFor: "",
    sortBy: "",
    sortDirection: "ASC",
    filerByPosition: FootballPositionsAbbreviations.DEFAULT,
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
          firstName: playerData.firstName?.toLowerCase(),
          lastName: playerData.lastName?.toLowerCase(),
          age: playerData.age,
          position: playerData.position,
          nationality: playerData.nationality,
          club: playerData.club,
          weight: playerData.weight + "kg", // TODO: 'kg' should be global variable
          height: playerData.height + "cm", // TODO: 'cm' should be global variable
          leadFoot: playerData.leadFoot,
          seenAt: playerData.seenAt,
          note: playerData.note,
        } as PlayerData,
      };
      const res = await addNewFirebaseDocument(
        `users/${currentUserUid}/players`,
        playerObj
      );

      return res;
    },

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

    async deletePlayer(playerId: string) {
      const { $auth } = useNuxtApp();
      const currentUserUid = $auth.currentUser?.uid;
      await deleteFirebaseDocument(`users/${currentUserUid}/players`, playerId);
    },

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
  },
});
