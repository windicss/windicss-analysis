<script setup lang="ts">
import { classes } from '~/logic/data'
</script>

<template>
  <div class="container">
    <ClassesList :classes="classes" />
  </div>
</template>
