<template>
  <form @submit.prevent="login">
    <h2>Log in</h2>
    <input type="email" placeholder="Email" required v-model="email" />
    <input type="password" placeholder="Password" required v-model="password" />
    <button>Login</button>
  </form>

  <p>
    No account yet?
    <span @click="$emit('toggleShowLogin', false)">Sign up</span> instead.
  </p>
</template>

<script setup>
const { signInUser } = useFirebaseAuth();
defineEmits(["toggleShowLogin"]);

const email = ref("oz@oz.com");
const password = ref("deskorolka");

async function login() {
  await signInUser(email.value, password.value);
}
</script>
