<template>
  <button @click="isAddNewListModalVisible = true">Add new list</button>

  <form v-if="isAddNewListModalVisible" @submit.prevent="addNewListHandler">
    <input v-model="newListName" type="text" placeholder="list name" />
    <button type="submit" :disabled="!newListName">add</button>
  </form>

  <ul>
    <li v-for="list in lists" :key="list.id">
      {{ list.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import type { List } from "@/types/types";
import { Unsubscribe } from "@firebase/firestore";

const { addNewFirebaseDocument, subscribeToFirebaseCollection } =
  useFirebaseDb();
const userStore = useUserStore();

const currentUserUid = userStore.user?.uid;
const isAddNewListModalVisible = ref(false);
// TODO: ENDED HERE! Create logic for deleting lists
// TODO: ENDED HERE! Move this logic to Pinia
const lists: Ref<List[]> = ref([]);
const newListName = ref("");

let unsubscribeFromListsCollection: Unsubscribe | undefined;
onMounted(() => {
  subscribeToListsCollection();
});
onUnmounted(() => {
  if (unsubscribeFromListsCollection) unsubscribeFromListsCollection();
});

async function subscribeToListsCollection() {
  unsubscribeFromListsCollection = await subscribeToFirebaseCollection(
    `users/${currentUserUid}/lists`,
    "createdAt",
    lists
  );
}

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
