<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { getClassInfo } from '~/logic'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  count: {
    default: '',
  },
})

const url = computed(() => `/class?name=${encodeURIComponent(props.name)}`)
const info = computed(() => getClassInfo(props.name))
// @ts-ignore
const note = computed(() => info.value[props.count])
</script>

<template>
  <RouterLink
    :to="url"
    class="font-mono text-sm opacity-50 border-b border-transparent hover:(opacity-100 text-primary border-primary)"
  >
    <span>{{ props.name }}</span>
    <sup v-if="note" class="opacity-50 ml-0.5">{{ note }}</sup>
  </RouterLink>
</template>
