<template>
  <button @click="signOutHandler">Sign Out</button>
  <h1>Welcome {{ userStore.user?.displayName || "user" }}</h1>
  <main>
    <!-- <TestComponent /> -->
    <TestListsOwnedByUser />
  </main>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const { signOutUser } = useFirebaseAuth();
async function signOutHandler() {
  await signOutUser();
}
</script>
