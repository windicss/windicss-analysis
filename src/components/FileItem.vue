<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { root } from '~/logic/data'

const props = defineProps({
  path: {
    type: String,
    default: '',
  },
})

const filepath = computed(() => props.path.startsWith(root.value) ? props.path.slice(root.value.length + 1) : props.path)
const url = computed(() => `/file?path=${encodeURIComponent(props.path)}`)
</script>

<template>
  <RouterLink
    :to="url"
    class="py-2 px-3 -mx-3 text-sm bg-gray-500 font-mono bg-opacity-0 hover:bg-opacity-10 rounded"
  >
    <slot>
      {{ filepath }}
    </slot>
  </RouterLink>
</template>
