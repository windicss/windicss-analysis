<script setup lang="ts">
import { colors } from '~/logic'
</script>

<template>
  <div v-if="colors.length">
    <div class="subheader">
      Color Palette
    </div>
    <div class="flex flex-wrap gap-2 -mx-2">
      <div
        v-for="color in colors"
        :key="color.name"
        class="inline-block p-2 rounded hover:(bg-gray-400 bg-opacity-10)"
      >
        <div class="rounded h-10 w-25" :style="{ background: color.hex }">
        </div>
        <div class="mt-1">
          <span class="font-mono">{{ color.name }}</span>
          <sup class="text-sm ml-0.5 opacity-50">{{ color.utilities.length }}</sup>
        </div>
        <div class="font-mono text-sm opacity-50">
          {{ color.hex }}
        </div>
      </div>
    </div>
  </div>
</template>
