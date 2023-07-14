<template>
  <div>
    <h3>List name - {{ listName }}</h3>

    <TestPlayerControls :list-id="listId" />

    <ul>
      <li v-for="player in filteredPlayers" :key="player.id">
        {{ player.data.firstName }} {{ player.data.lastName }} ({{
          player.data.age
        }}) ---
        <button @click="deletePlayerHandler(player.id!)">delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { PlayerObj, sortDirections } from "@/types/types";
import { useListsStore } from "@/stores/listsStore";
import { usePlayersStore } from "@/stores/playersStore";
const listsStore = useListsStore();
const playersStore = usePlayersStore();
const route = useRoute();

const listId = route.params.listId as string;
const listName = computed(() => listsStore.lists[listId]?.name);
const sortBy = ref("age");
const sortDirection: Ref<sortDirections> = ref("ASC");

// This computed will handle other filters like, position, age etc.
const filteredPlayers: ComputedRef<PlayerObj[]> = computed(() => {
  let players = playersStore.players.filter((player) =>
    player.inLists.includes(listId)
  );

  if (sortBy.value)
    players = sortData<PlayerObj>(players, sortBy.value, sortDirection.value);

  return players;
});

// TODO: ENDED HERE!
// 1. Move sortData to utils folder
// 2. create toggle buttons for sortBy values
const sortData = <T extends { [key: string]: any }>(
  arr: T[],
  param: string,
  direction = "ASC"
) => {
  return direction == "ASC"
    ? [...arr].sort((a, b) => {
        if (a.data[param] < b.data[param]) return -1;
        if (a.data[param] > b.data[param]) return 1;
        return 0;
      })
    : [...arr].sort((a, b) => {
        if (b.data[param] < a.data[param]) return -1;
        if (b.data[param] > a.data[param]) return 1;
        return 0;
      });
};

async function deletePlayerHandler(payerId: string) {
  // TODO: Ask for approval before removing!!!
  await playersStore.deletePlayer(payerId);
}
</script>
