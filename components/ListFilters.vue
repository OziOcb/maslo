<template>
  <div>
    <h4>filters</h4>

    <section>
      <span>Search for</span>
      <input v-model="playersStore.searchFor" type="text" />
    </section>

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
  playersStore.sortBy = "";
  playersStore.sortDirection = "ASC";
  playersStore.filerByPosition = null;
}
</script>
