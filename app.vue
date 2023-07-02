<template>
  <NuxtPage />
</template>

<script setup>
const { watchForAuthChange } = useFirebaseAuth();

let unsubscribe;
onMounted(() => {
  unsubscribe = watchForAuthChange();
});
onUnmounted(() => {
  unsubscribe();
});
</script>
