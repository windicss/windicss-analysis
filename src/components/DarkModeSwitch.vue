<template>
  <button class="!outline-none opacity-50 hover:opacity-75" aria-label="Toggle dark mode" @click="toggle">
    <carbon-moon v-show="isDark" class="text-xl" />
    <carbon-sun v-show="!isDark" class="text-xl" />
  </button>
</template>

<script setup lang='ts'>
import { useToggle } from '@vueuse/core'
import { isDark } from '../logic/dark'

const toggle = useToggle(isDark)
</script>
