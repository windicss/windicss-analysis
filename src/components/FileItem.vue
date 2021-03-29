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
    class="px-2 py-1 bg-gray-500 bg-opacity-10 hover:bg-opacity-20 rounded"
  >
    <slot>
      {{ filepath }}
    </slot>
  </RouterLink>
</template>
