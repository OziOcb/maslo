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
  let players = playersStore.players.filter((player) =>
    player.inLists.includes(listId)
  );

  if (playersStore.sortBy)
    players = utilSortArray<PlayerObj>(
      players,
      playersStore.sortDirection,
      "data",
      playersStore.sortBy
    );

  return players;
});

async function deletePlayerHandler(payerId: string) {
  // TODO: Ask for approval before removing!!!
  await playersStore.deletePlayer(payerId);
}
</script>
