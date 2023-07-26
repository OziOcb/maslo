<template>
  <VNavigationDrawer
    v-model="globalStore.isDrawerOpen"
    :temporary="xs"
    :permanent="mdAndUp"
    :rail="rail"
  >
    <VListItem
      prepend-avatar="/img/account.svg"
      :title="userStore.user?.displayName"
      nav
    >
    </VListItem>

    <VDivider />

    <VList density="compact" nav>
      <VListItem
        v-for="(link, index) in links"
        :key="index"
        :prepend-icon="link.icon"
        :title="link.title"
        :to="link.to"
      />
    </VList>

    <template #append>
      <VBtn
        flat
        class="ml-1 mb-1"
        :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
        @click.stop="rail = !rail"
      />
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/globalStore";
import { useUserStore } from "@/stores/userStore";

const globalStore = useGlobalStore();
const userStore = useUserStore();
const { xs, mdAndUp } = useDisplay();

const rail = ref(false);
const links = [
  {
    icon: "mdi-home",
    title: "Dashboard",
    to: "/dashboard",
  },
  {
    icon: "mdi-account-group-outline",
    title: "Players",
    to: "/dashboard/players",
  },
];
</script>
