<template>
  <VContainer tag="section" class="pa-0">
    <VRow>
      <VCol cols="12" sm="4" lg="2">
        <VCard title="Your Lists">
          <VTabs
            v-if="Object.keys(listStore.lists).length"
            direction="vertical"
            color="primary"
          >
            <VTab
              v-for="list in listStore.lists"
              :key="list.id"
              :to="`/dashboard/players/list-${list.id}`"
              :value="list.id"
            >
              {{ list.name }}
            </VTab>
          </VTabs>

          <VBtn
            text="+ Add new list"
            class="ma-2"
            variant="tonal"
            @click="isAddNewListModalVisible = true"
          />
        </VCard>
      </VCol>

      <VCol style="border: 1px solid red">
        <NuxtPage />
      </VCol>
    </VRow>
  </VContainer>

  <VAlert
    v-if="!Object.keys(listStore.lists).length"
    type="warning"
    text="It appears that you haven't created a list yet!"
  />

  <VDialog v-model="isAddNewListModalVisible" max-width="600px">
    <VCard>
      <VToolbar>
        <VBtn icon="mdi-close" @click="isAddNewListModalVisible = false" />
        <VToolbarTitle text="Add New List" />
      </VToolbar>

      <VContainer>
        <VTextField
          v-model="newListName"
          label="List Name"
          variant="underlined"
          clearable
        />
      </VContainer>

      <VCardActions>
        <VBtn
          text="Save"
          color="primary"
          block
          :disabled="!newListName"
          @click="addNewListHandler"
        />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useListsStore } from "@/stores/listsStore";
const listStore = useListsStore();
const route = useRoute();

const isAddNewListModalVisible = ref(false);
const newListName = ref("");

onMounted(() => {
  listStore.subscribeToListsCollection();
});
onBeforeUnmount(() => {
  listStore.unsubscribeFromListsCollection();
});

async function addNewListHandler() {
  const res = await listStore.addNewList(newListName.value);
  newListName.value = "";
  isAddNewListModalVisible.value = false;
  navigateTo(`/dashboard/players/list-${res?.id}`);
}

async function deleteList(listId: string) {
  // TODO: Ask for approval before removing!!!
  await listStore.deleteList(listId);
  if (route.params.listId === listId) navigateTo("/dashboard");
}
</script>
