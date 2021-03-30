<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  classes: {
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
    <ClassLabel
      v-for="c in props.classes"
      :key="c"
      :name="c"
      :count="props.count"
    />
  </div>
</template>
