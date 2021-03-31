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

const url = computed(() => `/utility?name=${encodeURIComponent(props.name)}`)
const info = computed(() => getUtilityInfo(props.name))
// @ts-expect-error
const note = computed(() => info.value[props.count])
</script>

<template>
  <RouterLink
    v-if="name"
    :to="url"
    class="font-mono text-sm border-b border-transparent hover:(opacity-100 border-current)"
    :class="info.rule?.classes != null ? [info.rule.classes, 'opacity-75'] : 'opacity-50'"
  >
    <span>{{ props.name }}</span>
    <sup v-if="note && note != 1" class="opacity-50 ml-0.5">{{ note }}</sup>
  </RouterLink>
</template>
