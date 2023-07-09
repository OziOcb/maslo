<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
