<template>
  <div v-if="!userStore.user">
    <FormLogin v-if="showLogin" @toggleShowLogin="showLogin = $event" />
    <FormSignup v-else @toggleShowLogin="showLogin = $event" />
  </div>

  <div v-else>
    <h1>Welcome {{ userStore.user.displayName || "user" }}</h1>
    <button @click="signOutHandler">Sign Out</button>
    <!-- <TestComponent /> -->
  </div>

  <NuxtPage />
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const { signOutUser, onAuthStateChanged } = useFirebaseAuth();
const { $auth } = useNuxtApp();

const showLogin = ref(true);

async function signOutHandler() {
  await signOutUser();
}

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
