<template>
  <VAlert
    v-if="!doesAnyListExist"
    type="warning"
    text="It appears that you haven't created a list yet!"
    class="mb-4"
  />

  <VContainer tag="section" class="pa-0">
    <VRow>
      <VCol cols="12" sm="3" lg="2">
        <VCard title="Your Lists">
          <VTabs direction="vertical" color="primary">
            <VTab
              class="tab"
              v-for="list in listStore.lists"
              :key="list.id"
              :to="`/dashboard/players/list-${list.id}`"
              :value="list.id"
            >
              {{ list.name }}

              <VBtn
                class="tab__deleteBtn"
                icon="mdi-trash-can"
                color="red"
                size="x-small"
                variant="outlined"
                @click.stop.prevent="
                  toggleDeleteDialogHandler(true, list.id, list.name)
                "
              />
            </VTab>
          </VTabs>

          <VBtn
            text="+ Add new list"
            class="ma-2"
            variant="tonal"
            @click="isAddNewListDialogVisible = true"
          />
        </VCard>
      </VCol>

      <VCol v-if="doesAnyListExist">
        <p v-if="!route.params.listId">&lt;-- pick a list</p>
        <NuxtPage />
      </VCol>
    </VRow>
  </VContainer>

  <VDialog v-model="isAddNewListDialogVisible" max-width="600px">
    <VCard>
      <VToolbar>
        <VBtn icon="mdi-close" @click="isAddNewListDialogVisible = false" />
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

  <VDialog v-model="isDeleteListDialogVisible" max-width="600px">
    <VCard>
      <VToolbar>
        <VBtn icon="mdi-close" @click="isDeleteListDialogVisible = false" />
        <VToolbarTitle text="Are you sure?" />
      </VToolbar>

      <VContainer class="text-center">
        <p>Just to confirm, do you really want to delete this list?</p>
        <p class="text-h4">{{ listToDeleteName }}</p>
      </VContainer>

      <VCardActions>
        <VBtn text="Delete" color="red" block @click="deleteList" />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useListsStore } from "@/stores/listsStore";
const listStore = useListsStore();
const route = useRoute();

const isAddNewListDialogVisible = ref(false);
const isDeleteListDialogVisible = ref(false);
const listToDeleteId = ref("");
const listToDeleteName = ref("");
const newListName = ref("");
const doesAnyListExist = computed(() => Object.keys(listStore.lists).length);

onMounted(() => {
  listStore.subscribeToListsCollection();
});
onBeforeUnmount(() => {
  listStore.unsubscribeFromListsCollection();
});

async function addNewListHandler() {
  const res = await listStore.addNewList(newListName.value);
  newListName.value = "";
  isAddNewListDialogVisible.value = false;
  navigateTo(`/dashboard/players/list-${res?.id}`);
}

function toggleDeleteDialogHandler(
  isVisible: boolean,
  listId?: string,
  listName?: string
) {
  isDeleteListDialogVisible.value = isVisible;
  listToDeleteId.value = isVisible ? listId! : "";
  listToDeleteName.value = isVisible ? listName! : "";
}

async function deleteList() {
  await listStore.deleteList(listToDeleteId.value);
  toggleDeleteDialogHandler(false);
  if (route.params.listId === listToDeleteId.value)
    navigateTo(`/dashboard/players`);
}
</script>

<style lang="scss" scoped>
.tab {
  position: relative;

  &__deleteBtn {
    position: absolute;
    right: 8px;
    opacity: 0;

    .tab:hover & {
      opacity: 1;
    }
  }
}
</style>
