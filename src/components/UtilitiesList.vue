<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  utilities: {
    type: Array,
    default: () => [],
  },
  count: {
    default: '',
  },
})
</script>

<template>
  <div class="flex flex-wrap gap-x-2 gap-y-2">
    <UtilityLabel
      v-for="c in props.utilities"
      :key="c"
      :name="c"
      :count="props.count"
    />
  </div>
</template>
