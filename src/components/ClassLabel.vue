<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { getClassInfo } from '~/logic/data'

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
})

const url = computed(() => `/class?name=${encodeURIComponent(props.name)}`)
const info = computed(() => getClassInfo(props.name))
</script>

<template>
  <RouterLink
    :to="url"
    class="px-2 py-1 bg-gray-500 bg-opacity-10 hover:bg-opacity-20 font-mono rounded"
  >
    <slot>
      {{ props.name }} <span class="opacity-40 text-sm ">{{ info.count }}</span>
    </slot>
  </RouterLink>
</template>
