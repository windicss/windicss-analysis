<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { getFileExt } from '@shared'
import { root } from '~/logic'

const props = defineProps({
  path: {
    type: String,
    default: '',
  },
})

const filepath = computed(() => props.path.startsWith(root.value) ? props.path.slice(root.value.length + 1) : props.path)
</script>

<template>
  <div class="py-2 px-3 -mx-3 text-sm">
    <FileIcon :type="getFileExt(filepath)" />
    <span class="ml-2 opacity-50">{{ filepath }}</span>
    <slot />
  </div>
</template>
