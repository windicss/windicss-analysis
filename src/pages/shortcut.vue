<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFetch } from '@vueuse/core'
import { getShortcutInfo } from '~/logic'

const route = useRoute()
const name = computed(() => route.query.name as string || '')

const info = computed(() => getShortcutInfo(name.value))

const url = computed(() => `/api/interpret?name=${encodeURIComponent(name.value)}`)
const request = useFetch(url, { immediate: false, refetch: false })
const css = computed(() => {
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
    <div class="mb-4 -mx-2">
      <span
        class="px-2 py-1 font-mono text-3xl"
      >
        {{ name }}
      </span>
    </div>
    <div
      v-if="!info.full"
      class="italic opacity-50 mb-8"
    >
      This shortcut does not been used in the project.
    </div>
    <div
      v-if="info.full"
      class="mb-8 grid gap-x-4 gap-y-2"
      style="grid-template-columns: max-content auto;"
    >
      <div class="opacity-50 text-sm my-auto text-red-200">
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
    </div>

    <template v-if="css">
      <div class="subheader">
        CSS
      </div>
      <CodeBlock
        class="!-mx-3"
        lang="css"
        :code="css"
      />
    </template>
    <br>
    <div class="subheader">
      Used in Files<sup class="ml-1 opacity-50">{{ info.files.length }}</sup>
    </div>
    <div v-if="info?.files?.length">
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
