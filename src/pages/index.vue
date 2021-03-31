<script setup lang="ts">
import { isDemo } from '~/env'
</script>

<template>
  <div class="container">
    <DemoNote v-if="isDemo" />
    <Overview class="pb-2" />
    <TopUtilities class="pb-2" />
    <ColorPalette class="pb-2" />
    <UtilitiesUsage class="pb-2" />
  </div>
</template>
