<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { getUtilityInfo } from '~/logic'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  count: {
    default: '',
  },
})

const url = computed(() => `/shortcut?name=${encodeURIComponent(props.name)}`)
const info = computed(() => getUtilityInfo(props.name))
</script>

<template>
  <RouterLink
    v-if="name"
    :to="url"
    class="font-mono text-sm border-b border-transparent hover:(opacity-100 border-current)"
    :class="info.rule?.classes != null ? [info.rule.classes, 'opacity-75'] : 'opacity-50'"
  >
    <span>{{ props.name }}</span>
    <sup class="opacity-50 ml-1">{{ props.count }}</sup>
  </RouterLink>
</template>
