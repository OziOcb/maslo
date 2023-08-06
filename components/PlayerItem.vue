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
        class="ml-2 mt-3 d-none d-sm-flex"
        size="50"
        circle
        color="primary"
      >
        <!-- <v-img src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"></v-img> -->
        GK
      </VAvatar>

      <div>
        <VCardTitle class="text-h6">
          {{ player.data.firstName }} {{ player.data.lastName }}
        </VCardTitle>

        <VContainer>
          <VRow>
            <VCol cols="12" sm="6"
              >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Officiis repellat modi quae suscipit reprehenderit cumque
              assumenda? Repudiandae quae fuga tenetur perferendis labore dolor,
              officiis voluptate reprehenderit, doloribus ut, asperiores qui?
            </VCol>

            <VCol cols="12" sm="6"
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
              minima suscipit, cupiditate sequi eveniet tenetur repudiandae,
              saepe accusamus perspiciatis reprehenderit placeat voluptatem
              ratione dolor error recusandae non quos tempore. Sit?
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

defineProps<{
  player: PlayerObj;
}>();

async function deletePlayerHandler(payerId: string) {
  // TODO: Ask for approval before removing!!!
  await playersStore.deletePlayer(payerId);
}
</script>
