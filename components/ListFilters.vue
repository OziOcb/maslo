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

    <VContainer class="pa-0">
      <VRow no-gutters>
        <VCol cols="12" sm="6" class="mt-n4 pr-sm-1">
          <VSelect
            v-model="playersStore.filerByPosition"
            name="filterByPosition"
            label="Filter by Position"
            variant="solo-filled"
            density="compact"
            clearable
            :items="utilsFootballPositionsArray"
          />
        </VCol>

        <VCol cols="12" sm="6" class="d-flex mt-n4 pl-sm-1">
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
        </VCol>
      </VRow>
    </VContainer>

    <VBtn
      v-if="
        playersStore.searchFor ||
        playersStore.sortBy ||
        playersStore.filerByPosition
      "
      class="d-block mt-n4 mb-2 ml-auto"
      variant="tonal"
      text="Reset All"
      @click="resetAllFiltersHandler"
    />
  </div>
</template>

<script setup lang="ts">
import type { PlayerData } from "@/types/types";
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
