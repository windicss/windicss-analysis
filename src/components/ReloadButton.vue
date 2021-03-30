<script setup lang="ts">
import { isServerless, fetchData } from '~/logic'

function reload() {
  fetchData(true)
}
</script>

<template>
  <button
    v-if="!isServerless"
    title="Reload"
    class="button text-sm"
    @click="reload"
  >
    <carbon-renew class="mr-1 text-sm opacity-50" />
    <span>Re-analysis</span>
  </button>
</template>
