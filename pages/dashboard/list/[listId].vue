<template>
  <div>
    <h3>List name - {{ listName }}</h3>

    <TestPlayerControls :list-id="listId" />

    <ul>
      <li v-for="player in filteredPlayers" :key="player.id">
        {{ player.data.firstName }} {{ player.data.lastName }}
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

// This computed will handle other filters like, position, age etc.
const filteredPlayers: ComputedRef<PlayerObj[]> = computed(() => {
  const playersInThisGroup = playersStore.players.filter((player) =>
    player.inLists.includes(listId)
  );

  // Other filters here...

  return playersInThisGroup;
});
</script>
