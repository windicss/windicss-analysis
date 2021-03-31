<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { editor } from '~/logic/preferences'
import { isStaticHost } from '~/env'

const props = defineProps({
  path: {
    type: String,
    default: '',
  },
})

const url = computed(() => `${editor.value}://file/${props.path}`)
</script>

<template>
  <a
    :href="isStaticHost ? undefined : url"
    class="bg-gray-400 font-mono bg-opacity-0 hover:bg-opacity-10 rounded"
  >
    <FileItem :path="path" />
  </a>
</template>
