<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getClassInfo } from '~/logic/data'

const route = useRoute()
const name = computed(() => route.query.name as string || '')

const { files, count } = getClassInfo(name)
</script>

<template>
  <div class="container">
    <div class="font-mono text-3xl mb-4">
      {{ name }}
    </div>
    <div class="opacity-50 mb-6">
      Usage count: {{ count }}
    </div>
    <div class="subheader">
      {{ files.length }} Files
    </div>
    <FileItem v-for="file of files" :key="file" :path="file" />
  </div>
</template>
