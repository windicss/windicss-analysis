<script setup lang="ts">
import { computed, ref } from 'vue'
import Fuse from 'fuse.js'
import { searchEnabled, utilities } from '~/logic'

const value = ref('')

const fuse = computed(() => new Fuse(utilities.value, {
  keys: ['full', 'category'],
}))

const result = computed(() => {
  const indexes = fuse.value.search(value.value).map(i => i.refIndex)
  return indexes.map(i => utilities.value[i])
})

function close() {
  searchEnabled.value = false
}
</script>

<template>
  <div v-if="searchEnabled" class="fixed left-0 right-0 top-0 bottom-0 z-20 grid">
    <div class="absolute left-0 right-0 top-0 bottom-0 bg-background bg-opacity-75" @click="close"></div>
    <div class="absolute left-1/2 top-10 transform -translate-x-1/2 rounded shadow-xl w-200 bg-background p-4 border duotone-border z-30">
      <div class="rounded flex my-auto bg-gray-400 bg-opacity-10 h-10">
        <carbon:search class="my-auto mx-3 opacity-20" />
        <input v-model="value" class="bg-transparent outline-none w-full" placeholder="Search..." />
      </div>
      <div v-if="result.length" class="px-2 pt-6 rounded">
        <UtilitiesList :utilities="result" count="count" @click="close" />
      </div>
    </div>
  </div>
</template>
