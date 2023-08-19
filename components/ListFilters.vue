<template>
  <div>
    <VTextField
      v-model="playersStore.searchFor"
      name="searchFor"
      label="Search"
      variant="solo-filled"
      density="compact"
      clearable
    />

    <section class="d-flex">
      <VSelect
        v-model="playersStore.sortBy"
        name="sortBy"
        label="Sort By"
        variant="solo-filled"
        density="compact"
        clearable
        :items="Object.keys(DEFAULT_PLAYER_DATA)"
      />
      <VBtn
        v-if="playersStore.sortBy"
        class="ml-1"
        variant="plain"
        size="x-large"
        density="compact"
        :icon="
          playersStore.sortDirection === 'ASC'
            ? 'mdi-arrow-up-bold-circle-outline'
            : 'mdi-arrow-down-bold-circle-outline'
        "
        @click="toggleSortDirectionHandler"
      />
    </section>

    <section>
      <!-- TODO: ENDED HERE! -->
      <!-- TODO: ENDED HERE! Use Vuetify components here -->
      <!-- TODO: ENDED HERE! -->
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
      v-if="
        playersStore.searchFor ||
        playersStore.sortBy ||
        playersStore.filerByPosition
      "
      @click="resetAllFiltersHandler"
    >
      Reset All filters
    </button>
  </div>
</template>

<script setup lang="ts">
import type { PlayerData } from "@/types/types";
import { FootballPositions } from "@/types/enums";
import { usePlayersStore } from "@/stores/playersStore";
const playersStore = usePlayersStore();

const DEFAULT_PLAYER_DATA: PlayerData = {
  firstName: "",
  lastName: "",
  age: 0,
  position: null,
  nationality: "",
  club: "",
  weight: "",
  height: "",
  leadFoot: null,
  seenAt: "",
  notes: "",
};

function toggleSortDirectionHandler() {
  playersStore.sortDirection =
    playersStore.sortDirection === "ASC" ? "DESC" : "ASC";
}

function resetAllFiltersHandler() {
  playersStore.searchFor = "";
  playersStore.sortBy = null;
  playersStore.sortDirection = "ASC";
  playersStore.filerByPosition = null;
}
</script>
