<template>
  <VHover v-slot="{ isHovering, props }" close-delay="200">
    <VCard
      v-bind="props"
      tag="li"
      :color="isHovering ? 'grey-darken-3' : undefined"
      :elevation="isHovering ? 12 : 2"
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
        GK
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

        <VCardActions class="justify-end">
          <VBtn @click="deletePlayerHandler(player.id!)">delete</VBtn>
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

async function deletePlayerHandler(payerId: string) {
  // TODO: Ask for approval before removing!!!
  await playersStore.deletePlayer(payerId);
}
</script>

<style lang="scss" scoped>
.playerDetailsList {
  list-style: none;
}
</style>
