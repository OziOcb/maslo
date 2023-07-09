<template>
  <div>
    <div>default layout</div>
    <button @click="signOutHandler">Sign Out</button>
    <h1>Welcome {{ userStore.user?.displayName || "user" }}</h1>
    <TestListsOwnedByUser />

    <hr />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const { signOutUser } = useFirebaseAuth();
async function signOutHandler() {
  await signOutUser();
}
</script>
