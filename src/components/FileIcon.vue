<script setup lang="ts">
import { defineProps, computed } from 'vue'
import file from 'virtual:vite-icons/ic/sharp-insert-drive-file'
import js from 'virtual:vite-icons/vscode-icons/file-type-js-official'
import ts from 'virtual:vite-icons/vscode-icons/file-type-typescript-official'
import vue from 'virtual:vite-icons/vscode-icons/file-type-vue'
import css from 'virtual:vite-icons/vscode-icons/file-type-css'
import html from 'virtual:vite-icons/vscode-icons/file-type-html'
import svelte from 'virtual:vite-icons/vscode-icons/file-type-svelte'
import pug from 'virtual:vite-icons/vscode-icons/file-type-pug'

const props = defineProps({
  type: {
    default: 'file',
  },
})

const Icon = computed(() => {
  switch (props.type) {
    case 'vue':
      return vue
    case 'ts':
    case 'tsx':
      return ts
    case 'js':
    case 'jsx':
      return js
    case 'css':
      return css
    case 'html':
      return html
    case 'svelte':
      return svelte
    case 'pug':
      return pug
  }
  return file
})
</script>

<template>
  <component :is="Icon" />
</template>
