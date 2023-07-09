<template>
  <div style="display: flex">
    <button @click="isAddNewListModalVisible = true">Add new list</button>

    <form v-if="isAddNewListModalVisible" @submit.prevent="addNewListHandler">
      <input v-model="newListName" type="text" placeholder="list name" />
      <button type="submit" :disabled="!newListName">add</button>
    </form>
  </div>

  <ul>
    <li v-for="list in listStore.lists" :key="list.id">
      <NuxtLink :to="`/dashboard/list/${list.id}`">
        {{ list.name }}
      </NuxtLink>
      ---
      <button @click="deleteList(list.id!)">delete</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
const route = useRoute();

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
  const res = await listStore.addNewList(newListName.value);
  newListName.value = "";
  isAddNewListModalVisible.value = false;
  navigateTo(`/dashboard/list/${res?.id}`);
}

async function deleteList(listId: string) {
  // TODO: Ask for approval before removing!!!
  await listStore.deleteList(listId);
  if (route.params.listId === listId) navigateTo("/dashboard");
}
</script>

<style>
button:disabled {
  background-color: grey;
}
</style>
