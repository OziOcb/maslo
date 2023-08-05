<template>
  <li>
    {{ player.data.firstName }} ---
    <button @click="deletePlayerHandler(player.id!)">delete</button>
  </li>
</template>

<script setup lang="ts">
import type { PlayerObj } from "@/types/types";
import { usePlayersStore } from "@/stores/playersStore";

const playersStore = usePlayersStore();

defineProps<{
  player: PlayerObj;
}>();

async function deletePlayerHandler(payerId: string) {
  // TODO: Ask for approval before removing!!!
  await playersStore.deletePlayer(payerId);
}
</script>
