<template>
  <VCard
    class="mx-auto pa-12 pb-8"
    width="100%"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <VCardTitle class="pl-0">Sigh Up</VCardTitle>

    <VTextField
      v-model="username"
      :disabled="isLoading"
      density="compact"
      placeholder="Username"
      prepend-inner-icon="mdi-account"
      variant="outlined"
    />

    <VTextField
      v-model="email"
      :disabled="isLoading"
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    />

    <VTextField
      v-model="password"
      :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="isPasswordVisible ? 'text' : 'password'"
      :disabled="isLoading"
      density="compact"
      placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline"
      variant="outlined"
      @click:append-inner="isPasswordVisible = !isPasswordVisible"
    />

    <VBtn
      :loading="isLoading"
      :disabled="isDisabled"
      block
      class="mb-8"
      color="blue"
      size="large"
      variant="tonal"
      text="Sign Up"
      @click="signUpHandler"
    />

    <VCardText class="text-center">
      <a
        class="text-blue text-decoration-none"
        href="#"
        @click="!isLoading ? $emit('toggleShowLogin', true) : null"
      >
        Log in now <VIcon icon="mdi-chevron-right" />
      </a>
    </VCardText>
  </VCard>
</template>

<script setup>
defineEmits(["toggleShowLogin"]);

const { createUser } = useFirebaseAuth();

const email = ref("");
const username = ref("");
const password = ref("");

const isPasswordVisible = ref(false);
const isLoading = ref(false);

const isDisabled = computed(() => {
  return !username.value || !email.value || !password.value;
});

async function signUpHandler() {
  isLoading.value = true;
  await createUser(email.value, password.value, username.value);
  isLoading.value = false;
}
</script>
