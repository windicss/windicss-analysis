<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useFetch } from '@vueuse/core'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'

const props = defineProps({
  filepath: {
    type: String,
    default: '',
  },
})

const url = computed(() => `/api/read?path=${encodeURIComponent(props.filepath)}`)
const { data } = useFetch<string>(url)

const lang = computed(() => {
  const ext = props.filepath.slice(props.filepath.lastIndexOf('.') + 1).toLowerCase()
  switch (ext) {
    case 'js':
    case 'jsx':
      return 'javascript'
    case 'ts':
    case 'tsx':
      return 'typescript'
    case 'vue':
      return 'markup'
  }
  return 'javascript'
})

const hightlighted = computed(() => {
  if (!data.value)
    return ''
  return Prism.highlight(data.value, Prism.languages[lang.value], lang.value)
})
</script>

<template>
  <div class="font-mono">
    {{ props.filepath }}
  </div>
  <pre class="overflow-auto" :class="`language-${lang}`"><code v-html="hightlighted" /></pre>
</template>
