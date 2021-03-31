<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { getFileExt } from '@shared'
import { root } from '~/logic'
import { editor } from '~/logic/preferences'
import { isStaticHost } from '~/env'

const props = defineProps({
  path: {
    type: String,
    default: '',
  },
})

const filepath = computed(() => props.path.startsWith(root.value) ? props.path.slice(root.value.length + 1) : props.path)
const url = computed(() => `${editor.value}://file/${props.path}`)
</script>

<template>
  <a
    :href="isStaticHost ? undefined : url"
    class="py-2 px-3 -mx-3 text-sm bg-gray-400 font-mono bg-opacity-0 hover:bg-opacity-10 rounded"
  >
    <FileIcon :type="getFileExt(filepath)" />
    <span class="ml-2 opacity-50">{{ filepath }}</span>
  </a>
</template>
