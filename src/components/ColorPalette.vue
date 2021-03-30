<script setup lang="ts">
import { colors } from '~/logic'
</script>

<template>
  <div v-if="colors.length">
    <div class="subheader">
      Color Palette
    </div>
    <div class="flex flex-wrap gap-2 -mx-2">
      <RouterLink
        v-for="color in colors"
        :key="color.name"
        :to="`/color?color=${encodeURIComponent(color.name)}`"
      >
        <ColorView :color="color" />
      </RouterLink>
    </div>
  </div>
</template>
