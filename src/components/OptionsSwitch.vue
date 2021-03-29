<script setup lang="ts">
import { defineProps, defineEmit } from 'vue'

const emit = defineEmit()
const props = defineProps<{
  modelValue: string
  items: { value: string; display?: string }[]
}>()

function set(v: string) {
  if (v !== props.modelValue)
    emit('update:modelValue', v)
}
</script>

<template>
  <ul>
    <li
      v-for="i of items"
      :key="i.value"
      class="cursor-pointer"
      :class="i.value === props.modelValue ? 'text-primary': 'opacity-50'"
      @click="set(i.value)"
    >
      {{ i.display || i.value }}
    </li>
  </ul>
</template>
