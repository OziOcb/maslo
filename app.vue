<template>
  <div v-if="!isLoggedIn">
    <FormLogin v-if="showLogin" @toggleShowLogin="showLogin = $event" />
    <FormSignup v-else @toggleShowLogin="showLogin = $event" />
  </div>

  <div v-else>
    <h1>Welcome {{ displayName }}</h1>
    <button @click="signOutHandler">Sign Out</button>
    <!-- <TestComponent /> -->
  </div>
</template>

<script setup>
const { signOutUser, onAuthStateChanged } = useFirebaseAuth();
const { $auth } = useNuxtApp();

const isLoggedIn = ref(false);
const showLogin = ref(true);
const displayName = ref("user");

async function signOutHandler() {
  await signOutUser();
}

let unsubscribeOnAuthStateChanged;
onMounted(() => {
  unsubscribeOnAuthStateChanged = onAuthStateChanged($auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      displayName.value = user.displayName || "user";
    } else {
      isLoggedIn.value = false;
      displayName.value = "";
    }
  });
});
onUnmounted(() => {
  unsubscribeOnAuthStateChanged();
});
</script>
