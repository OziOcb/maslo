<template>
  <h1>Welcome {{ userStore.user?.displayName || "user" }}</h1>
  <button @click="signOutHandler">Sign Out</button>
  <!-- <TestComponent /> -->
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const { signOutUser } = useFirebaseAuth();
async function signOutHandler() {
  await signOutUser();
}
</script>
