<template>
  <FormLogin v-if="showLogin" @toggleShowLogin="showLogin = $event" />
  <FormSignup v-else @toggleShowLogin="showLogin = $event" />
</template>

<script setup>
const showLogin = ref(true);
</script>
