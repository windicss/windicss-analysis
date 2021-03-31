<script setup lang="ts">
import { ref, computed } from 'vue'
import { colors } from '~/logic'

const prefix = ref('')

function filterColors(v: string) {
  if (!v)
    return colors.value
  let exclude = false
  if (v[0] === '!') {
    exclude = true
    v = v.slice(1)
  }
  return colors.value.filter(
    i => exclude
      ? !i.prefixes.includes(v)
      : i.prefixes.includes(v),
  )
}

const filteredColors = computed(() => filterColors(prefix.value))
</script>

<template>
  <div v-if="colors.length">
    <div class="flex">
      <div class="subheader">
        Color Palette
        <sup class="opacity-50 text-sm">{{ filteredColors.length }}</sup>
      </div>
      <div class="flex-auto" />
      <OptionsSwitch
        v-if="filterColors('dark').length"
        v-model="prefix"
        class="mt-auto mb-3"
        :items="[
          { value: '', display: 'All' },
          { value: '!dark', display: 'Light' },
          { value: 'dark', display: 'Dark' },
        ]"
      />
    </div>

    <div class="flex flex-wrap gap-1 -mx-2">
      <RouterLink
        v-for="color in filteredColors"
        :key="color.name"
        :to="`/color?color=${encodeURIComponent(color.name)}`"
      >
        <ColorView :color="color" />
      </RouterLink>
    </div>
  </div>
</template>
