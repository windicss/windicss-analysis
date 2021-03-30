<script setup lang="ts">
import { utilities, data, files } from '~/logic'
</script>

<template>
  <div class="mb-5">
    <div class="text-center mb-10">
      <span class="text-2xl">{{ utilities.length }}</span>
      <span class="opacity-50 mx-1">utilities used in</span>
      <span class="text-xl">{{ files.length }}</span>
      <span class="opacity-50 mx-1">files</span>
      <br>
      <span class="opacity-50 mx-1">with</span>
      <span class="text-xl">{{ data?.dist.gzip }}</span>
      <span class="opacity-50 mx-1">coresponding CSS genreated (min+gzip)</span>
    </div>
  </div>
</template>
