<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  classes: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div class="flex flex-wrap">
    <ClassLabel
      v-for="c in props.classes"
      :key="c"
      :name="c"
      class="m-1"
    />
  </div>
</template>
