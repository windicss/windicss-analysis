<script setup lang="ts">
import { defineProps } from 'vue'
import type { ColorInfo } from '@shared'

defineProps<{ color: ColorInfo }>()
</script>

<template>
  <div class="inline-block p-2 rounded hover:(bg-gray-400 bg-opacity-10)">
    <div class="rounded h-10 w-25" :style="{ background: color.hex }">
    </div>
    <div class="mt-1">
      <span class="text-sm">{{ color.name }}</span>
      <sup class="text-xs ml-0.5 opacity-50">{{ color.utilities.length }}</sup>
    </div>
    <div class="font-mono text-sm opacity-50">
      {{ color.hex }}
    </div>
  </div>
</template>
