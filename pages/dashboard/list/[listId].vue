<template>
  <div>
    <h3>List name - {{ listName }}</h3>

    <TestPlayerControls :list-id="listId" />

    <ul>
      <li v-for="player in filteredPlayers" :key="player.id">
        {{ player.data.firstName }} {{ player.data.lastName }} ({{
          player.data.age
        }}) [{{ player.data.position }}] ---
        <button @click="deletePlayerHandler(player.id!)">delete</button>
      </li>
    </ul>
  </div>
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
  const { players, sortBy, sortDirection, filerByPosition } = playersStore;

  let playersArr = players.filter((player) => player.inLists.includes(listId));

  if (filerByPosition) {
    playersArr = players.filter(
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

async function deletePlayerHandler(payerId: string) {
  // TODO: Ask for approval before removing!!!
  await playersStore.deletePlayer(payerId);
}
</script>
