<template>
  <NuxtPage />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const { onAuthStateChanged } = useFirebaseAuth();
const { $auth } = useNuxtApp();

let unsubscribeOnAuthStateChanged;
onMounted(() => {
  unsubscribeOnAuthStateChanged = onAuthStateChanged($auth, (user) => {
    if (user) {
      userStore.user = user;
    } else {
      userStore.$reset();
    }
  });
});
onUnmounted(() => {
  unsubscribeOnAuthStateChanged();
});
</script>
