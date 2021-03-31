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
      />
      <UtilitiesList
        v-if="current === file"
        class="p-2 pb-2"
        :utilities="file.utilities"
      />
    </div>
  </div>
</template>
