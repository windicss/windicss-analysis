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
    class="icon-button"
    @click="reload"
  >
    <carbon-renew class="text-xl" />
  </button>
</template>
