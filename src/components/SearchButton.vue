<script setup lang="ts">
// @ts-ignore
import { searchEnabled } from '~/logic'
</script>

<template>
  <button
    title="Search"
    class="icon-button"
    @click="searchEnabled = true"
  >
    <carbon-search />
  </button>
</template>
