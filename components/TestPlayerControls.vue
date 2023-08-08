<template>
  <div style="display: flex">
    <button @click="isAddNewPlayerModalVisible = true">Add new Player</button>

    <form
      v-if="isAddNewPlayerModalVisible"
      @submit.prevent="addPlayerHandler"
      style="display: flex; flex-direction: column"
    >
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
      <input v-model.trim="playerData.nationality" placeholder="nationality" />
      <input v-model.trim="playerData.club" placeholder="club" />
      <!-- prettier-ignore -->
      <input v-model.trim="playerData.weight" placeholder="weight" type="number" />
      <!-- prettier-ignore -->
      <input v-model.trim="playerData.height" placeholder="height" type="number" />
      <select v-model="playerData.leadFoot" name="leadFoot" id="leadFoot">
        <option value="">None</option>
        <option v-for="(foot, key) in LeadFoot" :value="key" :key="key">
          {{ foot }}
        </option>
      </select>
      <input v-model.trim="playerData.seenAt" placeholder="seen at" />
      <textarea v-model.trim="playerData.notes" placeholder="notes" />

      <button type="submit" :disabled="isSubmitDisabled">add</button>
    </form>
  </div>

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
import {
  FootballPositions,
  FootballPositionsAbbreviations,
  LeadFoot,
} from "@/types/enums";
import { usePlayersStore } from "@/stores/playersStore";
const playersStore = usePlayersStore();

const DEFAULT_PLAYER_DATA: PlayerData = {
  firstName: "",
  lastName: "",
  age: 0,
  position: FootballPositionsAbbreviations.DEFAULT,
  nationality: "",
  club: "",
  weight: "",
  height: "",
  leadFoot: LeadFoot.DEFAULT,
  seenAt: "",
  notes: "",
};

const props = defineProps<{
  listId: string;
}>();

const playerData: Ref<PlayerData> = ref({ ...DEFAULT_PLAYER_DATA });
const isAddNewPlayerModalVisible = ref(false);
const isSubmitDisabled = computed(() => {
  return !playerData.value.firstName;
  // return (
  //   !playerData.value.firstName ||
  //   !playerData.value.lastName ||
  //   !playerData.value.age ||
  //   !playerData.value.position
  // );
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
  playersStore.searchFor = "";
  playersStore.sortBy = "";
  playersStore.sortDirection = "ASC";
  playersStore.filerByPosition = FootballPositionsAbbreviations.DEFAULT;
}
</script>
