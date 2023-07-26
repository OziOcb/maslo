<template>
  <VRow class="d-flex flex-column align-center mt-8">
    <FormLogin v-if="showLogin" @toggleShowLogin="showLogin = $event" />
    <FormSignup v-else @toggleShowLogin="showLogin = $event" />
  </VRow>
</template>

<script setup>
const showLogin = ref(true);
</script>
