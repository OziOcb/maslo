<template>
  <li>
    <span class="font-weight-bold">{{ title }}: </span>{{ val }}
  </li>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  val?: string | number;
}>();
</script>
