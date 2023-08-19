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
      <ListFilters />

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
        <VToolbarTitle class="text-capitalize" :text="currentPlayerFullName" />
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
            v-if="currentPlayerAddedDate"
            title="Added"
            :val="
              formatDistanceToNow(currentPlayerAddedDate, { addSuffix: true })
            "
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
    @update:modelValue="
      toggleDialogsHandler(!isInEditMode ? 'add' : 'edit', false)
    "
  >
    <VCard>
      <VToolbar class="">
        <VBtn
          icon="mdi-close"
          @click="toggleDialogsHandler(!isInEditMode ? 'add' : 'edit', false)"
        />
        <VToolbarTitle
          :text="!isInEditMode ? 'Add New Player' : 'Edit Player'"
        />
      </VToolbar>

      <VCardText>
        <!-- TODO: Extract this form to a separate .vue file -->
        <VForm>
          <VTextField
            v-model="currentPlayerData.firstName"
            name="firstName"
            label="First Name*"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VTextField
            v-model="currentPlayerData.lastName"
            name="lastName"
            label="Last Name"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VTextField
            v-model="currentPlayerData.age"
            name="age"
            label="Age"
            type="number"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VSelect
            v-model="currentPlayerData.position"
            name="position"
            label="Position"
            variant="solo-filled"
            density="compact"
            clearable
            :items="footballPositionsArray"
          />
          <VTextField
            v-model="currentPlayerData.nationality"
            name="nationality"
            label="Nationality"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VTextField
            v-model="currentPlayerData.club"
            name="club"
            label="Club"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <div class="d-flex gap-16">
            <VTextField
              v-model="currentPlayerData.weight"
              name="weight"
              label="Weight"
              prefix="kg"
              type="number"
              variant="solo-filled"
              density="compact"
              clearable
            />
            <VTextField
              v-model="currentPlayerData.height"
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
            v-model="currentPlayerData.leadFoot"
            name="leadFoot"
            label="Lead Foot"
            variant="solo-filled"
            density="compact"
            clearable
            :items="leadFootArray"
          />
          <VTextField
            v-model="currentPlayerData.seenAt"
            name="seenAt"
            label="Seen At"
            variant="solo-filled"
            density="compact"
            clearable
          />
          <VTextarea
            v-model="currentPlayerData.notes"
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
          @click="currentPlayerData = { ...DEFAULT_PLAYER_DATA }"
        />
        <VBtn
          v-if="!isInEditMode"
          text="+Add Player"
          variant="elevated"
          color="success"
          :disabled="!currentPlayerData.firstName"
          @click="addPlayerHandler()"
        />
        <VBtn
          v-else
          text="Edit Player"
          variant="elevated"
          color="success"
          :disabled="
            !currentPlayerData.firstName ||
            _isEqual(currentPlayerData, tempPlayerData)
          "
          @click="editPlayerHandler()"
        />
      </VCardActions>
    </VCard>
  </VDialog>

  <!-- Remove -->
  <VDialog
    v-model="isDeletePlayerDialogVisible"
    max-width="600px"
    @update:modelValue="toggleDialogsHandler('delete', false)"
  >
    <VCard>
      <VToolbar>
        <VBtn icon="mdi-close" @click="toggleDialogsHandler('delete', false)" />
        <VToolbarTitle text="Are you sure?" />
      </VToolbar>

      <VContainer class="text-center">
        <p>Just to confirm, do you really want to delete this player?</p>
        <p class="text-h4 text-capitalize">{{ currentPlayerFullName }}</p>
      </VContainer>

      <VCardActions>
        <VBtn text="Delete" color="red" block @click="deletePlayerHandler" />
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
import { formatDistanceToNow, subDays } from "date-fns";
import { useDisplay } from "vuetify";
import type { PlayerObj, PlayerData } from "@/types/types";
import { useListsStore } from "@/stores/listsStore";
import { usePlayersStore } from "@/stores/playersStore";
import { FootballPositions, LeadFoot } from "@/types/enums";
import _isEqual from "lodash.isequal";
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
    const doesInclude = (val: any) => val?.toLowerCase().includes(search);

    playersArr = playersArr.filter((player) => {
      const {
        firstName,
        lastName,
        age,
        position,
        nationality,
        club,
        leadFoot,
        seenAt,
      } = player.data;

      return (
        doesInclude(firstName) ||
        doesInclude(lastName) ||
        doesInclude(age?.toString()) ||
        doesInclude(position) ||
        doesInclude(nationality) ||
        doesInclude(club) ||
        doesInclude(leadFoot) ||
        doesInclude(seenAt)
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
      playersStore.sortBy as string
    );

  return playersArr;
});

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

const isShowPlayerDialogVisible = ref(false);
const isAddOrEditPlayerDialogVisible = ref(false);
const isDeletePlayerDialogVisible = ref(false);
const isInEditMode = ref(false);
const tempPlayerData = ref<PlayerData>();
const currentPlayerId = ref<string | undefined>("");
const currentPlayerAddedDate = ref<number>();
const currentPlayerData = ref<PlayerData>({
  ...DEFAULT_PLAYER_DATA,
});
const currentPlayerFullName = ref("");

function toggleDialogsHandler(
  type: "add" | "delete" | "edit" | "showMore",
  isVisible: boolean,
  player?: PlayerObj
) {
  if (type === "showMore") isShowPlayerDialogVisible.value = isVisible;
  if (type === "add") isAddOrEditPlayerDialogVisible.value = isVisible;
  if (type === "delete") isDeletePlayerDialogVisible.value = isVisible;
  if (type === "edit") {
    isInEditMode.value = isVisible;
    isAddOrEditPlayerDialogVisible.value = isVisible;
    currentPlayerData.value = { ...player?.data };
    tempPlayerData.value = { ...player?.data };
  }

  currentPlayerId.value = player?.id;
  currentPlayerAddedDate.value = player?.createdAt;
  currentPlayerFullName.value = `${player?.data.firstName} ${player?.data.lastName}`;
  currentPlayerData.value = isVisible
    ? { ...player?.data }
    : { ...DEFAULT_PLAYER_DATA };
}

async function addPlayerHandler() {
  await playersStore.addNewPlayer(listId, currentPlayerData.value!);
  isAddOrEditPlayerDialogVisible.value = false;
  currentPlayerData.value = { ...DEFAULT_PLAYER_DATA };
}

async function editPlayerHandler() {
  await playersStore.updatePlayer(
    currentPlayerId.value as string,
    currentPlayerData.value
  );
  toggleDialogsHandler("edit", false);
}

async function deletePlayerHandler() {
  await playersStore.deletePlayer(currentPlayerId.value as string);
  toggleDialogsHandler("delete", false);
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
