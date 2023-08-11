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
        <VCardTitle class="text-h6 text-capitalize">
          {{ player.data.firstName }} {{ player.data.lastName }}
        </VCardTitle>

        <VContainer>
          <VRow>
            <VCol cols="12" sm="6">
              <ul class="playerDetailsList">
                <DetailsListItem
                  v-if="player.data.nationality"
                  title="Nationality"
                  :val="player.data.nationality"
                />
                <DetailsListItem
                  v-if="player.data.club"
                  title="Club"
                  :val="player.data.club"
                />
                <DetailsListItem
                  v-if="player.data.age"
                  title="Age"
                  :val="player.data.age?.toString()"
                />
                <DetailsListItem
                  v-if="player.data.leadFoot"
                  title="Lead Foot"
                  :val="player.data.leadFoot?.toString()"
                />
              </ul>
            </VCol>

            <VCol cols="12" sm="6">
              <ul class="playerDetailsList">
                <DetailsListItem
                  v-if="player.data.position"
                  title="Position"
                  :val="player.data.position?.toString()"
                />
                <DetailsListItem
                  v-if="player.data.weight && player.data.weight !== 'kg'"
                  title="Weight"
                  :val="player.data.weight"
                />
                <DetailsListItem
                  v-if="player.data.height && player.data.height !== 'cm'"
                  title="Height"
                  :val="player.data.height"
                />
                <DetailsListItem
                  v-if="player.data.seenAt"
                  title="Seen At"
                  :val="player.data.seenAt"
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

// prettier-ignore
const playerInitials =
  `${props.player.data.firstName?.slice(0, 1)}${props.player.data.lastName?.slice(0, 1)}`.toUpperCase();
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
