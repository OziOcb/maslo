<template>
  <VCard title="Login" class="elevation-5">
    <VCardText>
      <!-- TODO: ENDED HERE! Use Vuetify's inputs below and then recreate the SignUp form (make sure that the submit buttons are disabled if inputs are empty) -->
      <input type="email" placeholder="Email" required v-model="email" />
      <input
        type="password"
        placeholder="Password"
        required
        v-model="password"
      />
    </VCardText>

    <VCardActions>
      <VBtn
        class="flex-grow-1"
        color="primary"
        variant="outlined"
        text="Login"
        :loading="isLoading"
        @click="loginHandler"
      />
    </VCardActions>
  </VCard>

  <div class="mt-4">
    No account yet?

    <VBtn
      variant="tonal"
      text="Sign Up"
      @click="$emit('toggleShowLogin', false)"
    />
  </div>
</template>

<script setup>
defineEmits(["toggleShowLogin"]);

const { signInUser } = useFirebaseAuth();

const email = ref("oz@oz.com");
const password = ref("deskorolka");
const isLoading = ref(false);

async function loginHandler() {
  isLoading.value = true;
  await signInUser(email.value, password.value);
  isLoading.value = false;
}
</script>
