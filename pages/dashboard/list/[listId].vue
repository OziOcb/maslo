<template>
  <div>
    <h3>List name - {{ listName }}</h3>

    <TestPlayerControls :list-id="listId" />
  </div>
</template>

<script setup lang="ts">
import { useListsStore } from "@/stores/listsStore";
const listsStore = useListsStore();
const route = useRoute();

const listId = route.params.listId as string;
const listName = computed(() => listsStore.lists[listId]?.name);

// 3. Add options for deleting players
// 4. Display a list of players from this group (onSnap)
// 5. Add options for filtering players
</script>
