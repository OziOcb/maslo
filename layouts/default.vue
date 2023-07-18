<template>
  <VApp>
    <AppTopBar />

    <VMain>
      <slot />
    </VMain>
  </VApp>
</template>

<script setup lang="ts">
// import { useUserStore } from "@/stores/userStore";
// const userStore = useUserStore();

const title = ref("OziOcb - My App");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - My App` : "OziOcb - My App";
  },
});
</script>
