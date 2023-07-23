<template>
  <VAppBar>
    <template v-slot:prepend v-if="isNotIndexPage">
      <VAppBarNavIcon
        @click="globalStore.isDrawerOpen = !globalStore.isDrawerOpen"
      />
    </template>

    <VAppBarTitle>My App</VAppBarTitle>

    <template v-slot:append>
      <VBtn :icon="themeTogglerIcon" @click="toggleTheme" />

      <VMenu v-if="isNotIndexPage">
        <template v-slot:activator="{ props }">
          <VBtn icon="mdi-dots-vertical" v-bind="props" />
        </template>

        <VList>
          <VListItem
            v-for="(item, i) in items"
            :key="i"
            @click="item.click"
            :title="item.title"
          />
        </VList>
      </VMenu>
    </template>
  </VAppBar>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/globalStore";
const globalStore = useGlobalStore();

const route = useRoute();
const isNotIndexPage = computed(() => route.name !== "index");

const theme = useTheme();
const themeTogglerIcon = computed(() =>
  theme.global.current.value.dark
    ? "mdi-white-balance-sunny"
    : "mdi-weather-night"
);
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
}

const { signOutUser } = useFirebaseAuth();
const items = [{ title: "Logout", click: signOutUser }];
</script>
