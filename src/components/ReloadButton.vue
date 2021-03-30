<script setup lang="ts">
import { isStatic, fetchData } from '~/logic'

function reload() {
  fetchData(true)
}
</script>

<template>
  <button
    v-if="!isStatic"
    title="Reload"
    class="button text-sm"
    @click="reload"
  >
    <carbon-renew class="mr-1 text-sm opacity-50" />
    <span>Re-analysis</span>
  </button>
</template>
