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
                <DetailsListItem
                  v-if="pData.nationality"
                  title="Nationality"
                  :val="pData.nationality"
                />
                <DetailsListItem
                  v-if="pData.club"
                  title="Club"
                  :val="pData.club"
                />
                <DetailsListItem
                  v-if="pData.age"
                  title="Age"
                  :val="pData.age?.toString()"
                />
                <DetailsListItem
                  v-if="pData.leadFoot"
                  title="Lead Foot"
                  :val="pData.leadFoot?.toString()"
                />
              </ul>
            </VCol>

            <VCol cols="12" sm="6">
              <ul class="playerDetailsList">
                <DetailsListItem
                  v-if="pData.position"
                  title="Position"
                  :val="pData.position?.toString()"
                />
                <DetailsListItem
                  v-if="pData.weight && pData.weight !== 'kg'"
                  title="Weight"
                  :val="pData.weight"
                />
                <DetailsListItem
                  v-if="pData.height && pData.height !== 'cm'"
                  title="Height"
                  :val="pData.height"
                />
                <DetailsListItem
                  v-if="pData.seenAt"
                  title="Seen At"
                  :val="pData.seenAt"
                />
              </ul>
            </VCol>
          </VRow>
        </VContainer>

        <VCardActions class="justify-space-between">
          <VBtn
            color="primary"
            text="More"
            @click="$emit('showMore', player)"
          />

          <div>
            <VBtn
              variant="plain"
              size="small"
              @click="$emit('editPlayer', player)"
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
              @click="$emit('deletePlayer', player)"
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

defineEmits<{
  (event: "editPlayer", player: PlayerObj): void;
  (event: "deletePlayer", player: PlayerObj): void;
  (event: "showMore", player: PlayerObj): void;
}>();

const props = defineProps<{
  player: PlayerObj;
}>();

const pData = props.player.data;
// prettier-ignore
const playerInitials = `${pData.firstName?.slice(0, 1)}${pData.lastName?.slice(0, 1)}`.toUpperCase();
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
