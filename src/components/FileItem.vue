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
const url = computed(() => `vscode-insiders://file/${props.path}`)
</script>

<template>
  <a
    :href="url"
    class="py-2 px-3 -mx-3 text-sm bg-gray-500 font-mono bg-opacity-0 hover:bg-opacity-10 rounded"
  >
    <FileIcon :type="getFileExt(filepath)" />
    <span class="opacity-50 ml-2 hover:opacity-100">{{ filepath }}</span>
  </a>
</template>
