<script setup lang="ts">
import { computed, defineProps } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'

const props = defineProps({
  code: {
    default: '',
  },
  lang: {
    default: '',
  },
  path: {
    default: '',
  },
})

const lang = computed(() => {
  if (props.lang)
    return props.lang
  const ext = props.path.slice(props.path.lastIndexOf('.') + 1).toLowerCase()
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
  return Prism.highlight(props.code || '', Prism.languages[lang.value], lang.value)
})
</script>

<template>
  <pre v-if="hightlighted" class="overflow-auto" :class="`language-${lang}`"><code v-html="hightlighted" /></pre>
</template>
