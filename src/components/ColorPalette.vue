<script setup lang="ts">
import { ref, computed } from 'vue'
import { colors } from '~/logic'

const variant = ref('')

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
      ? !i.variants.includes(v)
      : i.variants.includes(v),
  )
}

const filteredColors = computed(() => filterColors(variant.value))
</script>

<template>
  <div v-if="colors.length">
    <div class="flex">
      <div class="subheader">
        Color Palette
        <sup class="opacity-50 text-sm">{{ filteredColors.length }}</sup>
      </div>
      <div class="flex-auto" />
      <div v-if="filterColors('dark').length">
        <OptionsSwitch
          v-model="variant"
          :items="[
            { value: '', display: 'All' },
            { value: '!dark', display: 'Light' },
            { value: 'dark', display: 'Dark' },
          ]"
        />
      </div>
    </div>

    <div class="flex flex-wrap gap-2 -mx-2">
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
