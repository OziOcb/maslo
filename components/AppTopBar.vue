<template>
  <VAppBar>
    <template v-slot:prepend v-if="route.name !== 'index'">
      <!-- TODO: ENDED HERE! Add VNavigationDrawer on click -->
      <VAppBarNavIcon />
    </template>

    <VAppBarTitle>My App</VAppBarTitle>

    <template v-slot:append v-if="route.name !== 'index'">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" />
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" @click="item.click">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </VAppBar>
</template>

<script setup lang="ts">
const route = useRoute();
const { signOutUser } = useFirebaseAuth();

const items = [{ title: "Logout", click: signOutUser }];
</script>
