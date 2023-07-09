<template>
  <div>
    <h3>List name - {{ listName }}</h3>
  </div>
</template>

<script setup lang="ts">
// 1. Display the group name
import { useListsStore } from "@/stores/listsStore";
const route = useRoute();
const listStore = useListsStore();

const listId = route.params.listId;
const listName = computed(() => listStore.lists[listId as string]?.name);

// TODO: ENDED HERE!
// 2. Add buttons for adding players
// 3. Display a list of players from this group (onSnap)
// 4. Add options for deleting players
// 5. Add options for filtering players
</script>
