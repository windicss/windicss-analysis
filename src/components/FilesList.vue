<script setup lang="ts">
import type { FileInfo } from '@shared'
import { shallowRef } from 'vue'
import { files } from '~/logic'

const current = shallowRef<FileInfo | null>(null)

function toggle(file: FileInfo) {
  if (current.value === file)
    current.value = null
  else
    current.value = file
}
</script>

<template>
  <div>
    <div class="subheader">
      Files
      <sup class="opacity-50 text-sm">{{ files.length }}</sup>
    </div>
    <div
      v-for="file of files"
      :key="file.filepath"
      class="px-4 -mx-4 cursor-pointer select-none rounded hover:(bg-gray-400 bg-opacity-5)"
      :class="current === file ? 'bg-gray-400 bg-opacity-5 rounded' : ''"
    >
      <FileItem
        :path="file.filepath"
        @click="toggle(file)"
      >
        <sup class="ml-0.5 opacity-25 text-xs">{{ file.utilities.length }}</sup>
      </FileItem>
      <UtilitiesList
        v-if="current === file"
        class="pl-6 pr-2 pt-2 pb-4"
        :utilities="file.utilities.sort()"
      />
    </div>
  </div>
</template>
