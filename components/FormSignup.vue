<template>
  <form @submit.prevent="signUp">
    <h2>Sign Up</h2>
    <input type="text" placeholder="Username" required v-model="username" />
    <input type="email" placeholder="Email" required v-model="email" />
    <input type="password" placeholder="Password" required v-model="password" />
    <button>Sign Up</button>
  </form>

  <p>
    Already registered?
    <span @click="$emit('toggleShowLogin', true)">Login</span> instead.
  </p>
</template>

<script setup>
const { createUser } = useFirebaseAuth();
defineEmits(["toggleShowLogin"]);

const username = ref("oz");
const email = ref("oz@oz.com");
const password = ref("deskorolka");

async function signUp() {
  await createUser(email.value, password.value, username.value);
}
</script>
