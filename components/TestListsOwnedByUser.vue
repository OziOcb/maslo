<template>
  <button @click="isAddNewListModalVisible = true">Add new list</button>

  <form v-if="isAddNewListModalVisible" @submit.prevent="addNewListHandler">
    <input v-model="listName" type="text" placeholder="list name" />
    <button type="submit" :disabled="!listName">add</button>
  </form>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
const { addNewFirebaseDocument } = useFirebaseDb();
const userStore = useUserStore();

const currentUserUid = userStore.user?.uid;

const isAddNewListModalVisible = ref(false);
const listName = ref("");

async function addNewListHandler() {
  const listObj = {
    name: listName.value,
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
