import { MaybeRef } from '@vueuse/core'
import { computed, ref, unref } from 'vue'
import { AnalysisReport } from '../../shared'

export const data = ref<AnalysisReport | null>()

export async function fetchData() {
  data.value = await fetch('/api/report.json')
    .then(r => r.json())
  return data.value
}

export const root = computed(() => data.value?.root || '')
export const fullClasses = computed(() => data.value?.files.flatMap(i => i.classes) || [])
export const classes = computed(() => Object.keys(data.value?.utilities || {}).sort())
export const files = computed(() => data.value?.files.map(i => i.filepath) || [])

export function getClassInfo(name: MaybeRef<string>) {
  return {
    ...data.value?.utilities[unref(name)],
    files: data.value?.files
      .filter(i => i.classes.includes(unref(name)))
      .map(i => i.filepath) || [],
  }
}
