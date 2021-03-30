<script setup lang="ts">
import { defineProps } from 'vue'
import type { ColorInfo } from '@shared'

defineProps<{ color: ColorInfo }>()
</script>

<template>
  <div class="rounded p-2 w-25 inline-block overflow-hidden hover:(bg-gray-400 bg-opacity-10)">
    <div class="rounded h-10" :style="{ background: color.hex }">
    </div>
    <div class="mt-1 whitespace-nowrap overflow-ellipsis overflow-hidden">
      <span class="text-sm overflow-ellipsis">{{ color.name }}</span>
      <sup class="text-xs ml-0.5 opacity-50">{{ color.utilities.length }}</sup>
    </div>
    <div class="font-mono text-sm opacity-50 whitespace-nowrap overflow-ellipsis overflow-hidden">
      {{ color.hex }}
    </div>
  </div>
</template>
