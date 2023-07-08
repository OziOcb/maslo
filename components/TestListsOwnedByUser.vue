<template>
  <button @click="isAddNewListModalVisible = true">Add new list</button>

  <form v-if="isAddNewListModalVisible" @submit.prevent="addNewListHandler">
    <input v-model="newListName" type="text" placeholder="list name" />
    <button type="submit" :disabled="!newListName">add</button>
  </form>

  <ul>
    <li v-for="list in listStore.lists" :key="list.id">
      {{ list.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { useListsStore } from "@/stores/listsStore";
import type { List } from "@/types/types";

const { addNewFirebaseDocument } = useFirebaseDb();
const userStore = useUserStore();
const listStore = useListsStore();

const currentUserUid = userStore.user?.uid;
const isAddNewListModalVisible = ref(false);
const newListName = ref("");

onMounted(() => {
  listStore.subscribeToListsCollection();
});
onUnmounted(() => {
  listStore.unsubscribeFromListsCollection();
});

// TODO: ENDED HERE! 1. Move this to pinia
// TODO: ENDED HERE! 2. Add logic for delecting lists
async function addNewListHandler() {
  const listObj: List = {
    name: newListName.value,
    createdAt: Date.now(),
    allowedUsers: [currentUserUid],
  };
  await addNewFirebaseDocument(`users/${currentUserUid}/lists`, listObj);
  isAddNewListModalVisible.value = false;
}
</script>

<style>
button:disabled {
  background-color: grey;
}
</style>
