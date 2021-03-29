<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const filepath = computed(() => route.query.path as string || '')
</script>

<template>
  <div class="container">
    <FileDetail :filepath="filepath" />
  </div>
</template>
