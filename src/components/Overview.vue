<script setup lang="ts">
import { topUtilities } from '~/logic'
</script>

<template>
  <div class="mb-5">
    Top 10
    <ClassesList :classes="topUtilities" count="baseCount" />
  </div>
</template>
