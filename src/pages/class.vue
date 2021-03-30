<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '@vueuse/core'
import { getClassInfo, isServerless } from '~/logic'

const route = useRoute()
const name = computed(() => route.query.name as string || '')

const info = getClassInfo(name)

const url = computed(() => `/api/interpret?name=${encodeURIComponent(name.value)}`)
const css = isServerless
  ? ref('')
  : useFetch(url).text().data
</script>

<template>
  <div class="container">
    <BackHome />
    <div class="px-2 py-1 font-mono text-3xl mb-4 bg-gray-400 bg-opacity-5 rounded inline-block">
      {{ name }}
    </div>
    <div class="mb-6 grid grid-cols-2 w-14em">
      <div class="opacity-50 text-sm my-auto">
        Usage count
      </div>
      <div>{{ info.count }}</div>
      <div class="opacity-50 text-sm my-auto">
        Category
      </div>
      <div>{{ info.category }}</div>
    </div>
    <template v-if="!isServerless">
      <div class="subheader">
        CSS
      </div>
      <CodeBlock lang="css" :code="css" />
    </template>
    <br>
    <div class="subheader">
      Used in Files<sup class="ml-1 opacity-50">{{ info.files.length }}</sup>
    </div>
    <div>
      <FileItem
        v-for="file of info.files"
        :key="file"
        :path="file"
        class="block"
      />
    </div>
    <!-- <pre v-text="JSON.stringify(info, null, 2)"></pre> -->
  </div>
</template>
