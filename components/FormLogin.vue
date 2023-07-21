<template>
  <VCard
    class="mx-auto pa-12 pb-8"
    width="100%"
    elevation="8"
    max-width="448"
    rounded="lg"
  >
    <div class="text-subtitle-1 text-medium-emphasis">Account</div>

    <VTextField
      v-model="email"
      :disabled="isLoading"
      density="compact"
      placeholder="Email address"
      prepend-inner-icon="mdi-email-outline"
      variant="outlined"
    />

    <!-- TODO: Add Forgot Password functionality -->
    <!-- <div
      class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
    >
      Password

      <a
        class="text-caption text-decoration-none text-blue"
        href="#"
        rel="noopener noreferrer"
        target="_blank"
      >
        Forgot login password?</a
      >
    </div> -->

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
      text="Log In"
      @click="loginHandler"
    />

    <VCardText class="text-center">
      <a
        class="text-blue text-decoration-none"
        href="#"
        @click="!isLoading ? $emit('toggleShowLogin', false) : null"
      >
        Sign up now <VIcon icon="mdi-chevron-right" />
      </a>
    </VCardText>
  </VCard>
</template>

<script setup>
defineEmits(["toggleShowLogin"]);

const { signInUser } = useFirebaseAuth();

const email = ref("oz@oz.com");
const password = ref("deskorolka");
const isPasswordVisible = ref(false);
const isLoading = ref(false);

const isDisabled = computed(() => {
  return !email.value || !password.value;
});

async function loginHandler() {
  isLoading.value = true;
  await signInUser(email.value, password.value);
  isLoading.value = false;
}
</script>
