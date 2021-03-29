<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const url = computed(() => `/class?name=${encodeURIComponent(props.name)}`)
// const info = computed(() => getClassInfo(props.name))
</script>

<template>
  <RouterLink
    :to="url"
    class="font-mono text-sm opacity-50 hover:(opacity-100 underline text-primary)"
  >
    <slot>
      {{ props.name }}
    </slot>
  </RouterLink>
</template>
