<template>
  <VCard>
    <VToolbar class="justify-justify-space-between">
      <VToolbarTitle :text="listName" class="text-capitalize" />
      <VBtn
        variant="tonal"
        :text="!mdAndUp ? '+' : '+ Add Player'"
        @click="toggleDialogsHandler('add', true)"
      />
    </VToolbar>

    <VContainer>
      <!-- <TestPlayerControls :list-id="listId" /> -->

      <ul class="playersList">
        <PlayerItem
          v-for="player in filteredPlayers"
          :key="player.id"
          :player="player"
          @edit-player="toggleDialogsHandler('edit', true, $event)"
          @delete-player="toggleDialogsHandler('delete', true, $event)"
          @show-more="toggleDialogsHandler('showMore', true, $event)"
        />
      </ul>
    </VContainer>
  </VCard>

  <VDialog
    v-model="isShowPlayerDialogVisible"
    :max-width="!mdAndUp ? '100%' : '50%'"
    scrollable
    @update:modelValue="toggleDialogsHandler('showMore', false)"
  >
    <VCard>
      <VToolbar>
        <VBtn
          icon="mdi-close"
          @click="toggleDialogsHandler('showMore', false)"
        />
        <VToolbarTitle
          class="text-capitalize"
          :text="`${pData?.firstName} ${pData?.lastName}`"
        />
      </VToolbar>

      <VContainer class="text-center">
        <ul class="playerDetailsList">
          <DetailsListItem title="Nationality" :val="pData?.nationality" />
          <DetailsListItem title="Club" :val="pData?.club" />
          <DetailsListItem title="Age" :val="pData?.age" />
          <DetailsListItem title="Lead Foot" :val="pData?.leadFoot" />
          <DetailsListItem title="Position" :val="pData?.position" />
          <DetailsListItem title="Weight" :val="pData?.weight" />
          <DetailsListItem title="Height" :val="pData?.height" />
          <DetailsListItem title="Seen At" :val="pData?.seenAt" />
          <DetailsListItem title="Notes" :val="pData?.note" class="mt-6" />
        </ul>
      </VContainer>

      <!-- TODO: Add this action buttons -->
      <!-- <VCardActions class="justify-end">
        <VBtn variant="plain" size="small" @click="">
          <VIcon icon="mdi-pencil" />
          <VTooltip activator="parent" location="top" text="edit" offset="2" />
        </VBtn>

        <VBtn color="error" variant="plain" size="small" @click="">
          <VIcon icon="mdi-trash-can" />
          <VTooltip
            activator="parent"
            location="top"
            text="delete"
            offset="2"
          />
        </VBtn>
      </VCardActions> -->
    </VCard>
  </VDialog>

  <VDialog
    v-model="isAddOrEditPlayerDialogVisible"
    :max-width="!mdAndUp ? '100%' : '50%'"
    scrollable
    @update:modelValue="toggleDialogsHandler('add', false)"
  >
    <VCard>
      <VToolbar>
        <VBtn icon="mdi-close" @click="toggleDialogsHandler('add', false)" />
        <VToolbarTitle text="Add New Player" />
      </VToolbar>

      <!-- TODO: ENDED HERE! -->
      <!-- TODO: ENDED HERE! -->
      <!-- TODO: ENDED HERE! Create Form for adding players -->
      <!-- TODO: ENDED HERE! -->
      <!-- TODO: ENDED HERE! -->
      <VContainer class="text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia porro
        quia itaque fugit rem aliquid odio eos, tenetur at voluptate numquam qui
        magni possimus quasi, maxime maiores architecto mollitia laborum?
      </VContainer>

      <VCardActions> actions </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import type { PlayerObj } from "@/types/types";
import { useListsStore } from "@/stores/listsStore";
import { usePlayersStore } from "@/stores/playersStore";
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
const listsStore = useListsStore();
const playersStore = usePlayersStore();
const route = useRoute();

const listId = route.params.listId as string;
const listName = computed(() => listsStore.lists[listId]?.name);

const filteredPlayers: ComputedRef<PlayerObj[]> = computed(() => {
  const { players, searchFor, sortBy, sortDirection, filerByPosition } =
    playersStore;

  let playersArr = players.filter((player) => player.inLists.includes(listId));

  if (searchFor) {
    const search = searchFor.toLowerCase();

    playersArr = playersArr.filter((player) => {
      const { firstName, lastName, age, position } = player.data;

      return (
        firstName?.includes(search) ||
        lastName?.includes(search) ||
        age?.toString().includes(search) ||
        position?.toLowerCase().includes(search)
      );
    });
  }

  if (filerByPosition) {
    playersArr = playersArr.filter(
      (player) => player.data.position === filerByPosition
    );
  }

  if (sortBy)
    playersArr = utilSortArray<PlayerObj>(
      playersArr,
      sortDirection,
      "data",
      playersStore.sortBy
    );

  return playersArr;
});

const isShowPlayerDialogVisible = ref(false);
const isAddOrEditPlayerDialogVisible = ref(false);
const isDeletePlayerDialogVisible = ref(false);
const isInEditMode = ref(false);
const currentPlayer = ref<PlayerObj>();
const pData = computed(() => currentPlayer.value?.data);

function toggleDialogsHandler(
  type: "add" | "delete" | "edit" | "showMore",
  isVisible: boolean,
  player?: PlayerObj
) {
  if (type === "showMore") isShowPlayerDialogVisible.value = isVisible;
  if (type === "add") isAddOrEditPlayerDialogVisible.value = isVisible;
  if (type === "delete") isDeletePlayerDialogVisible.value = isVisible;
  if (type === "edit") {
    isAddOrEditPlayerDialogVisible.value = isVisible;
    isInEditMode.value = isVisible ? true : false;
  }

  currentPlayer.value = isVisible ? player! : undefined;
}

async function deletePlayerHandler(payerId: string) {
  await playersStore.deletePlayer(payerId);
}
</script>

<style lang="scss" scoped>
.playersList {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.playerDetailsList {
  list-style: none;
  text-align: left;
}
</style>
