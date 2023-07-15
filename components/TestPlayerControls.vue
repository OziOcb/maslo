<template>
  <div style="display: flex">
    <button @click="isAddNewPlayerModalVisible = true">Add new Player</button>

    <!-- <form v-if="isAddNewPlayerModalVisible" @submit.prevent="addPlayerHandler"> -->
    <form @submit.prevent="addPlayerHandler">
      <input v-model.trim="playerData.firstName" placeholder="first" />
      <input v-model.trim="playerData.lastName" placeholder="last" />
      <input v-model.trim="playerData.age" placeholder="age" type="number" />
      <!-- <button type="submit" :disabled="isSubmitDisabled">add</button> -->
      <button type="submit">add</button>
    </form>
  </div>

  <div>
    <h4>filters</h4>
    <select v-model="playersStore.sortBy" name="sortBy" id="sortBy">
      <option value="">None</option>
      <option
        v-for="key in Object.keys(DEFAULT_PLAYER_DATA)"
        :value="key"
        :key="key"
      >
        {{ key }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { PlayerData } from "@/types/types";
import { usePlayersStore } from "@/stores/playersStore";
const playersStore = usePlayersStore();

const DEFAULT_PLAYER_DATA = {
  firstName: "",
  lastName: "",
  age: 0,
};

const props = defineProps<{
  listId: string;
}>();

const playerData: Ref<PlayerData> = ref({ ...DEFAULT_PLAYER_DATA });
const isAddNewPlayerModalVisible = ref(false);
const isSubmitDisabled = computed(() => {
  return !playerData.value.firstName || !playerData.value.lastName;
});

async function addPlayerHandler() {
  await playersStore.addNewPlayer(props.listId, playerData.value);
  isAddNewPlayerModalVisible.value = false;
  playerData.value = { ...DEFAULT_PLAYER_DATA };
}
</script>
