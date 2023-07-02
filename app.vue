<template>
  <div v-if="!isLoggedIn">
    <template v-if="showLogin">
      <FormLogin />
      <p>
        No account yet? <span @click="showLogin = false">Sign up</span> instead.
      </p>
    </template>

    <template v-else>
      <FormSignup />
      <p>
        Already registered?
        <span @click="showLogin = true">Login</span> instead.
      </p>
    </template>
  </div>

  <div v-else>
    <h1>Welcome {{ displayName }}</h1>
    <button @click="signOutHandler">Sign Out</button>
    <!-- <TestComponent /> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "#imports";
import { onAuthStateChanged } from "firebase/auth";
const { signOutUser } = useFirebaseAuth();
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
