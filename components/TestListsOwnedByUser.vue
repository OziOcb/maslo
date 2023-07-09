<template>
  <button @click="isAddNewListModalVisible = true">Add new list</button>

  <form v-if="isAddNewListModalVisible" @submit.prevent="addNewListHandler">
    <input v-model="newListName" type="text" placeholder="list name" />
    <button type="submit" :disabled="!newListName">add</button>
  </form>

  <ul>
    <li v-for="list in listStore.lists" :key="list.id">
      <span>{{ list.name }} - </span>
      <button @click="deleteList(list.id!)">delete</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useListsStore } from "@/stores/listsStore";
const listStore = useListsStore();

const isAddNewListModalVisible = ref(false);
const newListName = ref("");

onMounted(() => {
  listStore.subscribeToListsCollection();
});
onUnmounted(() => {
  listStore.unsubscribeFromListsCollection();
});

async function addNewListHandler() {
  await listStore.addNewList(newListName.value);
  newListName.value = "";
  isAddNewListModalVisible.value = false;
}

async function deleteList(listId: string) {
  // TODO: Ask for approval before removing!!!
  await listStore.deleteList(listId);
}
</script>

<style>
button:disabled {
  background-color: grey;
}
</style>
