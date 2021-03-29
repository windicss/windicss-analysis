<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const url = computed(() => `/class?name=${encodeURIComponent(props.name)}`)
</script>

<template>
  <RouterLink
    :to="url"
    class="px-2 py-1 bg-gray-500 bg-opacity-10 hover:bg-opacity-20 font-mono rounded"
  >
    <slot>
      {{ props.name }}
    </slot>
  </RouterLink>
</template>
