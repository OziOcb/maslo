<template>
  <VCard>
    <VToolbar class="justify-justify-space-between">
      <VToolbarTitle :text="listName" class="text-capitalize" />
      <VBtn
        variant="tonal"
        :text="!mdAndUp ? '+' : '+Add Player'"
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

  <!-- Show More -->
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
          :text="`${currentPlayerData?.firstName} ${currentPlayerData?.lastName}`"
        />
      </VToolbar>

      <VContainer class="text-center">
        <ul class="playerDetailsList">
          <DetailsListItem
            v-if="currentPlayerData?.nationality"
            title="Nationality"
            :val="currentPlayerData?.nationality"
          />
          <DetailsListItem
            v-if="currentPlayerData?.club"
            title="Club"
            :val="currentPlayerData?.club"
          />
          <DetailsListItem
            v-if="currentPlayerData?.age"
            title="Age"
            :val="currentPlayerData?.age?.toString()"
          />
          <DetailsListItem
            v-if="currentPlayerData?.leadFoot"
            title="Lead Foot"
            :val="currentPlayerData?.leadFoot?.toString()"
          />
          <DetailsListItem
            v-if="currentPlayerData?.position"
            title="Position"
            :val="currentPlayerData?.position?.toString()"
          />
          <DetailsListItem
            v-if="
              currentPlayerData?.weight && currentPlayerData?.weight !== 'kg'
            "
            title="Weight"
            :val="currentPlayerData?.weight"
          />
          <DetailsListItem
            v-if="
              currentPlayerData?.height && currentPlayerData?.height !== 'cm'
            "
            title="Height"
            :val="currentPlayerData?.height"
          />
          <DetailsListItem
            v-if="currentPlayerData?.seenAt"
            title="Seen At"
            :val="currentPlayerData?.seenAt"
          />
          <DetailsListItem
            v-if="currentPlayerData?.notes"
            title="Notes"
            :val="currentPlayerData?.notes"
            class="mt-6"
          />
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

  <!-- Add or Edit -->
  <VDialog
    v-model="isAddOrEditPlayerDialogVisible"
    :max-width="!mdAndUp ? '100%' : '50%'"
    scrollable
    persistent
    @update:modelValue="toggleDialogsHandler('add', false)"
  >
    <VCard>
      <VToolbar class="">
        <VBtn icon="mdi-close" @click="toggleDialogsHandler('add', false)" />
        <VToolbarTitle text="Add New Player" />
      </VToolbar>

      <VCardText>
        <!-- TODO: Extract this form to a separate .vue file -->
        <VForm>
          <VTextField
            v-model="newPlayerData.firstName"
            name="firstName"
            label="First Name*"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VTextField
            v-model="newPlayerData.lastName"
            name="lastName"
            label="Last Name"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VTextField
            v-model="newPlayerData.age"
            name="age"
            label="Age"
            type="number"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VSelect
            v-model="newPlayerData.position"
            name="position"
            label="Position"
            variant="solo-filled"
            density="compact"
            clearable
            :items="footballPositionsArray"
          />
          <VTextField
            v-model="newPlayerData.nationality"
            name="nationality"
            label="Nationality"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VTextField
            v-model="newPlayerData.club"
            name="club"
            label="Club"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <div class="d-flex gap-16">
            <VTextField
              v-model="newPlayerData.weight"
              name="weight"
              label="Weight"
              prefix="kg"
              type="number"
              variant="solo-filled"
              density="compact"
              clearable
            />
            <VTextField
              v-model="newPlayerData.height"
              name="height"
              label="Height"
              prefix="cm"
              type="number"
              variant="solo-filled"
              density="compact"
              clearable
            />
          </div>
          <VSelect
            v-model="newPlayerData.leadFoot"
            name="leadFoot"
            label="Lead Foot"
            variant="solo-filled"
            density="compact"
            clearable
            :items="leadFootArray"
          />
          <VTextField
            v-model="newPlayerData.seenAt"
            name="seenAt"
            label="Seen At"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VTextarea
            v-model="newPlayerData.notes"
            name="notes"
            label="Notes"
            variant="solo-filled"
            density="compact"
            clearable
          />
        </VForm>
      </VCardText>

      <VCardActions class="justify-space-between">
        <VBtn
          text="Reset"
          variant="plain"
          color="warning"
          @click="newPlayerData = { ...DEFAULT_PLAYER_DATA }"
        />
        <VBtn
          text="+Add Player"
          variant="elevated"
          color="success"
          :disabled="!newPlayerData.firstName"
          @click="addPlayerHandler()"
        />
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Remove -->
  <!-- TODO: ENDED HERE! -->
  <!-- TODO: ENDED HERE! -->
  <!-- TODO: ENDED HERE! Create VDialog for deleting players -->
  <!-- TODO: ENDED HERE! -->
  <!-- TODO: ENDED HERE! -->
</template>

<script setup lang="ts">
import type { PlayerObj, PlayerData } from "@/types/types";
import { useListsStore } from "@/stores/listsStore";
import { usePlayersStore } from "@/stores/playersStore";
import { useDisplay } from "vuetify";
import { FootballPositions, LeadFoot } from "@/types/enums";
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
const currentPlayerData = computed(() => currentPlayer.value?.data);

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

const DEFAULT_PLAYER_DATA: PlayerData = {
  firstName: "",
  lastName: "",
  age: null,
  position: null,
  nationality: "",
  club: "",
  weight: "",
  height: "",
  leadFoot: null,
  seenAt: "",
  notes: "",
};
const newPlayerData: Ref<PlayerData> = ref({ ...DEFAULT_PLAYER_DATA });

async function addPlayerHandler() {
  await playersStore.addNewPlayer(listId, newPlayerData.value);
  isAddOrEditPlayerDialogVisible.value = false;
  newPlayerData.value = { ...DEFAULT_PLAYER_DATA };
}
async function deletePlayerHandler(payerId: string) {
  await playersStore.deletePlayer(payerId);
}

const footballPositionsArray = Object.entries(FootballPositions).map(
  ([key, value]) => ({
    title: `${key} - ${value}`,
    value: key,
  })
);
const leadFootArray = Object.entries(LeadFoot).map(([key, value]) => ({
  title: value,
  value: key,
}));
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
