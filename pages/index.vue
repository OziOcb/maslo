<template>
  <FormLogin v-if="showLogin" @toggleShowLogin="showLogin = $event" />
  <FormSignup v-else @toggleShowLogin="showLogin = $event" />
</template>

<script setup>
definePageMeta({
  layout: "login",
});

const showLogin = ref(true);
</script>
