<template>
  <VHover v-slot="{ isHovering, props }" close-delay="200">
    <VCard
      v-bind="props"
      tag="li"
      :elevation="!isHovering ? 2 : 6"
      dense
      class="d-flex"
    >
      <VAvatar
        class="d-none d-sm-flex ml-2 mt-3"
        size="50"
        circle
        color="primary"
      >
        <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img> -->
        {{ playerInitials }}
      </VAvatar>

      <div class="w-100">
        <VCardTitle class="text-h6">
          {{ pData.firstName }} {{ pData.lastName }}
        </VCardTitle>

        <VContainer>
          <VRow>
            <VCol cols="12" sm="6">
              <ul class="playerDetailsList">
                <DetailsListItem title="Nationality" :val="pData.nationality" />
                <DetailsListItem title="Club" :val="pData.club" />
                <DetailsListItem title="Age" :val="pData.age" />
                <DetailsListItem title="Lead Foot" :val="pData.leadFoot" />
              </ul>
            </VCol>

            <VCol cols="12" sm="6">
              <ul class="playerDetailsList">
                <DetailsListItem title="Position" :val="pData.position" />
                <DetailsListItem title="Weight" :val="pData.weight" />
                <DetailsListItem title="Height" :val="pData.height" />
                <DetailsListItem title="Seen At" :val="pData.seenAt" />
              </ul>
            </VCol>
          </VRow>
        </VContainer>

        <VCardActions class="justify-space-between">
          <VBtn color="primary">More</VBtn>

          <div>
            <VBtn
              variant="plain"
              size="small"
              @click="toggleDialogsHandler('edit', true, list.id, list.name)"
            >
              <VIcon icon="mdi-pencil" />
              <VTooltip
                activator="parent"
                location="top"
                text="edit"
                offset="2"
              />
            </VBtn>

            <VBtn
              color="error"
              variant="plain"
              size="small"
              @click="toggleDialogsHandler('delete', true, list.id, list.name)"
            >
              <VIcon icon="mdi-trash-can" />
              <VTooltip
                activator="parent"
                location="top"
                text="delete"
                offset="2"
              />
            </VBtn>
          </div>
        </VCardActions>
      </div>
    </VCard>
  </VHover>
</template>

<script setup lang="ts">
import type { PlayerObj } from "@/types/types";
import { usePlayersStore } from "@/stores/playersStore";

const playersStore = usePlayersStore();

const props = defineProps<{
  player: PlayerObj;
}>();

const pData = props.player.data;
// prettier-ignore
const playerInitials =
  `${pData.firstName?.slice(0, 1)}${pData.lastName?.slice(0, 1)}`.toUpperCase();

async function deletePlayerHandler(payerId: string) {
  // TODO: Ask for approval before removing!!!
  await playersStore.deletePlayer(payerId);
}
</script>

<style lang="scss" scoped>
.playerDetailsList {
  list-style: none;
}

.toggleMenuBtn {
  border-color: transparent;
  &:hover,
  &:focus {
    border-color: initial;
  }
}
</style>
