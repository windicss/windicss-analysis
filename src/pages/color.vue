<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { data } from '~/logic'

const route = useRoute()
const colorName = computed(() => route.query.color as string || '')
const color = computed(() => data.value?.colors[colorName.value])
</script>

<template>
  <div class="container">
    <BackHome />
    <div v-if="color">
      <div class="flex">
        <div class="rounded h-25 w-25" :style="{ background: color.hex }">
        </div>
        <div class="px-4">
          <div class="text-2xl font-mono">
            {{ color.name }}
          </div>
          <div class="font-mono opacity-50">
            {{ color.hex }}
          </div>
        </div>
      </div>
      <div class="subheader mt-10">
        Utilities
        <sup class="text-sm ml-0.5 opacity-50">{{ color.utilities.length }}</sup>
      </div>
      <UtilitiesList :utilities="color.utilities" />
    </div>
  </div>
</template>
