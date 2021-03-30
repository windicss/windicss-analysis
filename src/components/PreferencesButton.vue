<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const showPreferences = ref(false)
const panel = ref<HTMLElement | null>()
onClickOutside(panel, () => {
  showPreferences.value = false
})
</script>

<template>
  <button
    ref="panel"
    class="my-auto inline-block relative !outline-none"
  >
    <carbon-settings-adjust
      class="text-xl opacity-50 hover:opacity-75"
      @click="showPreferences = !showPreferences"
    />
    <div
      v-show="showPreferences"
      class="bg-background border rounded-md shadow-xl mt-9 top-0 right-0 z-10 absolute duotone-border"
    >
      <PreferencesPanel />
    </div>
  </button>
</template>
