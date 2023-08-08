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

<style lang="scss">
.gap {
  &-2 {
    gap: 2px;
  }
  &-4 {
    gap: 4px;
  }
  &-6 {
    gap: 6px;
  }
  &-8 {
    gap: 80px;
  }
  &-10 {
    gap: 10px;
  }
  &-12 {
    gap: 12px;
  }
  &-14 {
    gap: 14px;
  }
  &-16 {
    gap: 16px;
  }
}
</style>
