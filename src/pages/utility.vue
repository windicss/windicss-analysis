<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '@vueuse/core'
import { getUtilityInfo, isServerless } from '~/logic'

const route = useRoute()
const name = computed(() => route.query.name as string || '')

const info = getUtilityInfo(name)

const url = computed(() => `/api/interpret?name=${encodeURIComponent(name.value)}`)
const request = useFetch(url, { immediate: false, refetch: false })
const css = computed(() => {
  if (info.css)
    return info.css
  if (isServerless)
    return ''
  return request.data.value
})

watch(
  name,
  () => request.execute(),
  { immediate: true },
)
</script>

<template>
  <div class="container">
    <BackHome />
    <div class="px-2 py-1 -mx-2 font-mono text-3xl mb-4 bg-gray-400 bg-opacity-5 rounded inline-block">
      {{ name }}
    </div>
    <div class="mb-8 grid gap-x-4 gap-y-2" style="grid-template-columns: max-content auto;">
      <div class="opacity-50 text-sm my-auto">
        Total usages
      </div>
      <div>{{ info.count }}</div>

      <div class="opacity-50 text-sm my-auto">
        Usage in files
      </div>
      <div>{{ info.files.length }} files</div>

      <div class="opacity-50 text-sm my-auto">
        Category
      </div>
      <div class="capitalize">
        {{ info.category }}
      </div>

      <template v-if="name !== info.base">
        <div class="opacity-50 text-sm my-auto">
          Base
        </div>
        <div>
          <UtilityLabel :name="info.base" />
        </div>
      </template>

      <template v-if="info.colorName">
        <div class="opacity-50 text-sm my-auto">
          Color
        </div>
        <div class="flex">
          {{ info.colorName }}
          <span class="font-mono opacity-50">({{ info.colorHex }})</span>
          <div class="w-4 h-4 ml-2 rounded inline-block m-auto" :style="{ background: info.colorHex }"></div>
        </div>
      </template>
    </div>

    <template v-if="info.shortcut">
      <div class="subheader">
        Shortcuts
      </div>
      <CodeBlock lang="json" :code="JSON.stringify(info.shortcut, null, 2)" />
    </template>
    <br>
    <template v-if="css">
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
