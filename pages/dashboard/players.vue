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

              <VMenu>
                <template v-slot:activator="{ props }">
                  <VBtn
                    class="tab__toggleMenuBtn"
                    icon="mdi-dots-vertical"
                    v-bind="props"
                    color="info"
                    size="x-small"
                    variant="outlined"
                    @click.stop.prevent=""
                  />
                </template>

                <VList>
                  <VListItem
                    append-icon="mdi-pencil"
                    title="edit"
                    base-color="edit"
                    @click="
                      toggleDialogsHandler('edit', true, list.id, list.name)
                    "
                  />
                  <VListItem
                    append-icon="mdi-trash-can"
                    title="delete"
                    base-color="red"
                    @click="
                      toggleDialogsHandler('delete', true, list.id, list.name)
                    "
                  />
                </VList>
              </VMenu>
            </VTab>
          </VTabs>

          <VBtn
            text="+ Add new list"
            class="ma-2"
            variant="tonal"
            @click="isAddOrEditListDialogVisible = true"
          />
        </VCard>
      </VCol>

      <VCol v-if="doesAnyListExist">
        <p v-if="!route.params.listId">&lt;-- pick a list</p>
        <NuxtPage />
      </VCol>
    </VRow>
  </VContainer>

  <VDialog
    v-model="isAddOrEditListDialogVisible"
    max-width="600px"
    @update:modelValue="
      toggleDialogsHandler(!isInEditMode ? 'add' : 'edit', false)
    "
  >
    <VCard>
      <VToolbar>
        <VBtn
          icon="mdi-close"
          @click="toggleDialogsHandler(!isInEditMode ? 'add' : 'edit', false)"
        />
        <VToolbarTitle :text="!isInEditMode ? 'Add New List' : 'Edit List'" />
      </VToolbar>

      <VContainer>
        <VTextField
          v-model="currentListName"
          label="List Name"
          variant="underlined"
          clearable
          autofocus
          :disabled="isAnythingLoading"
          @keyup.enter="!isInEditMode ? addListHandler() : editListHandler()"
        />
      </VContainer>

      <VCardActions>
        <VBtn
          v-if="!isInEditMode"
          text="Save"
          color="primary"
          block
          :disabled="!currentListName || isAnythingLoading"
          :loading="isAnythingLoading"
          @click="addListHandler"
        />
        <VBtn
          v-else
          text="Save Changes"
          color="primary"
          block
          :disabled="
            !currentListName ||
            currentListName === tempListName ||
            isAnythingLoading
          "
          :loading="isAnythingLoading"
          @click="editListHandler"
        />
      </VCardActions>
    </VCard>
  </VDialog>

  <VDialog
    v-model="isDeleteListDialogVisible"
    max-width="600px"
    @update:modelValue="toggleDialogsHandler('delete', false)"
  >
    <VCard>
      <VToolbar>
        <VBtn icon="mdi-close" @click="toggleDialogsHandler('delete', false)" />
        <VToolbarTitle text="Are you sure?" />
      </VToolbar>

      <VContainer class="text-center">
        <p>Just to confirm, do you really want to delete this list?</p>
        <p class="text-h4">{{ currentListName }}</p>
      </VContainer>

      <VCardActions>
        <VBtn text="Delete" color="red" block @click="deleteListHandler" />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { useListsStore } from "@/stores/listsStore";
const listStore = useListsStore();
const route = useRoute();

const isAddOrEditListDialogVisible = ref(false);
const isDeleteListDialogVisible = ref(false);

const isInEditMode = ref(false);
const tempListName = ref("");

const currentListId = ref("");
const currentListName = ref("");

const isAnythingLoading = ref(false);
const doesAnyListExist = computed(() => Object.keys(listStore.lists).length);

onMounted(() => {
  listStore.subscribeToListsCollection();
});
onBeforeUnmount(() => {
  listStore.unsubscribeFromListsCollection();
});

async function addListHandler() {
  isAnythingLoading.value = true;
  const res = await listStore.addNewList(currentListName.value);
  toggleDialogsHandler("add", false);
  navigateTo(`/dashboard/players/list-${res?.id}`);
  isAnythingLoading.value = false;
}

async function editListHandler() {
  isAnythingLoading.value = true;
  await listStore.updateList(currentListId.value, {
    name: currentListName.value,
  });
  toggleDialogsHandler("edit", false);
  isAnythingLoading.value = false;
}

async function deleteListHandler() {
  await listStore.deleteList(currentListId.value);
  toggleDialogsHandler("delete", false);
  if (route.params.listId === currentListId.value)
    navigateTo(`/dashboard/players`);
}

function toggleDialogsHandler(
  type: "add" | "delete" | "edit",
  isVisible: boolean,
  listId?: string,
  listName?: string
) {
  if (type === "add") isAddOrEditListDialogVisible.value = isVisible;
  if (type === "delete") isDeleteListDialogVisible.value = isVisible;
  if (type === "edit") {
    isAddOrEditListDialogVisible.value = isVisible;
    tempListName.value = isVisible ? listName! : "";
    isInEditMode.value = isVisible ? true : false;
  }

  currentListId.value = isVisible ? listId! : "";
  currentListName.value = isVisible ? listName! : "";
}
</script>

<style lang="scss" scoped>
.tab {
  position: relative;

  &__toggleMenuBtn {
    position: absolute;
    right: 8px;
    opacity: 0;

    .tab:hover & {
      opacity: 1;
    }
  }
}
</style>
