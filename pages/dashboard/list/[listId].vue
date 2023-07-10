<template>
  <div>
    <h3>List name - {{ listName }}</h3>

    <button @click="isAddNewPlayerModalVisible = true">Add new Player</button>

    <form v-if="isAddNewPlayerModalVisible" @submit.prevent="addPlayerHandler">
      <input v-model="playerData.firstName" type="text" placeholder="first" />
      <input v-model="playerData.lastName" type="text" placeholder="last" />
      <button
        type="submit"
        :disabled="!playerData.firstName || !playerData.lastName"
      >
        add
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
// 1. Display the group name
import type { PlayerData } from "@/types/types";
import { useListsStore } from "@/stores/listsStore";
import { usePlayersStore } from "@/stores/playersStore";
const listsStore = useListsStore();
const playersStore = usePlayersStore();
const route = useRoute();

const listId = route.params.listId;
const listName = computed(() => listsStore.lists[listId as string]?.name);

// 2. Add buttons for adding players
const isAddNewPlayerModalVisible = ref(false);
const playerData: Ref<PlayerData> = ref({
  firstName: "",
  lastName: "",
});

async function addPlayerHandler() {
  await playersStore.addNewPlayer(listId as string, playerData.value);
  isAddNewPlayerModalVisible.value = false;
  playerData.value = {
    firstName: "",
    lastName: "",
  };
}

// 3. Add options for deleting players
// 4. Display a list of players from this group (onSnap)
// 5. Add options for filtering players
</script>
