<script setup lang="ts">
import { topUtilities } from '~/logic'
</script>

<template>
  <div class="mb-5">
    <div class="subheader">
      Top 10 utilities
    </div>
    <div
      class="p-4 rounded-md bg-gray-400 bg-opacity-5"
    >
      <ClassesList :classes="topUtilities" count="baseCount" />
    </div>
  </div>
</template>
