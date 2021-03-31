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
  <ul class="text-sm rounded flex overflow-hidden">
    <li
      v-for="i of items"
      :key="i.value"
      class="cursor-pointer inline-block px-3 py-1 whitespace-nowrap bg-gray-400 bg-opacity-20 select-none"
      :class="i.value === props.modelValue ? 'text-primary bg-primary': 'opacity-50'"
      @click="set(i.value)"
    >
      {{ i.display || i.value }}
    </li>
  </ul>
</template>
