<template>
  <VCard :title="listName">
    <template v-slot:text>
      <!-- <TestPlayerControls :list-id="listId" /> -->

      <ul class="playersList">
        <PlayerItem
          v-for="player in filteredPlayers"
          :key="player.id"
          :player="player"
          @edit-player="toggleDialogsHandler('edit', true, $event)"
          @delete-player="toggleDialogsHandler('delete', true, $event)"
          @show-more="toggleDialogsHandler('showMore', true, $event)"
        />
      </ul>
    </template>
  </VCard>
</template>

<script setup lang="ts">
import type { PlayerObj } from "@/types/types";
import { useListsStore } from "@/stores/listsStore";
import { usePlayersStore } from "@/stores/playersStore";
const listsStore = useListsStore();
const playersStore = usePlayersStore();
const route = useRoute();

const listId = route.params.listId as string;
const listName = computed(() => listsStore.lists[listId]?.name);

const filteredPlayers: ComputedRef<PlayerObj[]> = computed(() => {
  const { players, searchFor, sortBy, sortDirection, filerByPosition } =
    playersStore;

  let playersArr = players.filter((player) => player.inLists.includes(listId));

  if (searchFor) {
    const search = searchFor.toLowerCase();

    playersArr = playersArr.filter((player) => {
      const { firstName, lastName, age, position } = player.data;

      return (
        firstName?.includes(search) ||
        lastName?.includes(search) ||
        age?.toString().includes(search) ||
        position?.toLowerCase().includes(search)
      );
    });
  }

  if (filerByPosition) {
    playersArr = playersArr.filter(
      (player) => player.data.position === filerByPosition
    );
  }

  if (sortBy)
    playersArr = utilSortArray<PlayerObj>(
      playersArr,
      sortDirection,
      "data",
      playersStore.sortBy
    );

  return playersArr;
});

// TODO: ENDED HERE!
// TODO: ENDED HERE!
// TODO: ENDED HERE! Create VDialogs for each type and display them accordingly
// TODO: ENDED HERE!
// TODO: ENDED HERE!
function toggleDialogsHandler(
  type: "add" | "delete" | "edit" | "showMore",
  isVisible: boolean,
  playerId?: string
) {
  // prettier-ignore
  console.log("-\n--\n type \n >", type, "\n--\n-") // REMOVE_ME: remove when done!
  // prettier-ignore
  console.log("-\n--\n isVisible \n >", isVisible, "\n--\n-") // REMOVE_ME: remove when done!
  // prettier-ignore
  console.log("-\n--\n playerId \n >", playerId, "\n--\n-") // REMOVE_ME: remove when done!
}

async function deletePlayerHandler(payerId: string) {
  await playersStore.deletePlayer(payerId);
}
</script>

<style lang="scss" scoped>
.playersList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
