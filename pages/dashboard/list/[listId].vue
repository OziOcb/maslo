<template>
  <div>
    <p>List name - {{ listName }}</p>
  </div>
</template>

<script setup lang="ts">
// 1. Wyswietl nazwe grupy
import { useListsStore } from "@/stores/listsStore";
const route = useRoute();
const listStore = useListsStore();

const listId = route.params.listId;
const listName = computed(() => listStore.lists[listId as string]?.name);

// 2. Dodaj przyciski do dodawania pilkarzy
// 3. Wyswietl liste pilkarzy z tej grupy
</script>
