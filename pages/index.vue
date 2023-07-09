<template>
  <main>
    <FormLogin v-if="showLogin" @toggleShowLogin="showLogin = $event" />
    <FormSignup v-else @toggleShowLogin="showLogin = $event" />
  </main>
</template>

<script setup>
definePageMeta({
  layout: "login",
});

const showLogin = ref(true);
</script>
