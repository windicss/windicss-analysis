<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import Fuse from 'fuse.js'
import { searchEnabled, utilities } from '~/logic'

const value = ref('')
const input = ref<HTMLInputElement | null>()

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

watch(
  [searchEnabled, input],
  async() => {
    await nextTick()
    if (searchEnabled.value && input.value)
      input.value.focus()
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="searchEnabled" class="fixed left-0 right-0 top-0 bottom-0 z-20 grid">
    <div class="absolute left-0 right-0 top-0 bottom-0 bg-background opacity-85" @click="close"></div>
    <div class="w-200 max-w-full absolute left-1/2 top-0 md:(top-[2em] border) duotone-border transform -translate-x-1/2 rounded shadow-xl bg-background p-4 z-30">
      <div class="rounded flex my-auto bg-gray-400 bg-opacity-10 h-10">
        <carbon:search class="my-auto mx-3 opacity-20" />
        <input
          ref="input"
          v-model="value"
          :autofocus="true"
          class="bg-transparent outline-none w-full"
          placeholder="Search..."
        />
      </div>
      <div v-if="result.length" class="px-2 pt-6 rounded">
        <UtilitiesList :utilities="result" count="count" @click="close" />
      </div>
    </div>
  </div>
</template>
