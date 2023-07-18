<template>
  <main>
    <FormLogin v-if="showLogin" @toggleShowLogin="showLogin = $event" />
    <FormSignup v-else @toggleShowLogin="showLogin = $event" />
  </main>
</template>

<script setup>
const showLogin = ref(true);
</script>
