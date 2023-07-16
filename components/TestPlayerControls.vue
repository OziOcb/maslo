<template>
  <div style="display: flex">
    <button @click="isAddNewPlayerModalVisible = true">Add new Player</button>

    <!-- <form v-if="isAddNewPlayerModalVisible" @submit.prevent="addPlayerHandler"> -->
    <form @submit.prevent="addPlayerHandler">
      <input v-model.trim="playerData.firstName" placeholder="first" />
      <input v-model.trim="playerData.lastName" placeholder="last" />
      <input v-model.trim="playerData.age" placeholder="age" type="number" />
      <select v-model="playerData.position" name="position" id="position">
        <option value="">None</option>
        <option
          v-for="(position, key) in FootballPositions"
          :value="key"
          :key="key"
        >
          {{ key }} - {{ position }}
        </option>
      </select>
      <!-- <button type="submit" :disabled="isSubmitDisabled">add</button> -->
      <button type="submit">add</button>
    </form>
  </div>

  <div>
    <h4>filters</h4>

    <section>
      <span>sortBy: </span>
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

      <br />

      <template v-if="playersStore.sortBy">
        <span>sortDirection</span>
        <button @click="toggleSortDirectionHandler">
          {{ playersStore.sortDirection === "ASC" ? "Up" : "Down" }}
        </button>
      </template>
    </section>

    <section>
      <span>filterByPosition</span>
      <select
        v-model="playersStore.filerByPosition"
        name="filterByPosition"
        id="filterByPosition"
      >
        <option value="">None</option>
        <option
          v-for="(position, key) in FootballPositions"
          :value="key"
          :key="key"
        >
          {{ key }} - {{ position }}
        </option>
      </select>
    </section>

    <button
      v-if="playersStore.sortBy || playersStore.filerByPosition"
      @click="resetAllFiltersHandler"
    >
      Reset All filters
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PlayerData } from "@/types/types";
import {
  FootballPositions,
  FootballPositionsAbbreviations,
} from "@/types/enums";
import { usePlayersStore } from "@/stores/playersStore";
const playersStore = usePlayersStore();

const DEFAULT_PLAYER_DATA = {
  firstName: "",
  lastName: "",
  age: 0,
  position: FootballPositionsAbbreviations.DEFAULT,
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

function toggleSortDirectionHandler() {
  playersStore.sortDirection =
    playersStore.sortDirection === "ASC" ? "DESC" : "ASC";
}

function resetAllFiltersHandler() {
  playersStore.sortBy = "";
  playersStore.sortDirection = "ASC";
  playersStore.filerByPosition = FootballPositionsAbbreviations.DEFAULT;
}
</script>
