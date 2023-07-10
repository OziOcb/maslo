import type { PlayerObj, PlayerData } from "@/types/types";
const { addNewFirebaseDocument, deleteFirebaseDocument } = useFirebaseDb();

interface State {
  players: PlayerObj[];
}

export const usePlayersStore = defineStore("usePlayersStore", {
  state: (): State => ({
    players: [],
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

    // async deletePlayer(listId: string) {
    //   const { $auth } = useNuxtApp();
    //   const currentUserUid = $auth.currentUser?.uid;
    //   await deleteFirebaseDocument(`users/${currentUserUid}/lists`, listId);
    // },
  },
});
