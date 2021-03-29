import { MaybeRef } from '@vueuse/core'
import { computed, ref, unref } from 'vue'
import type { AnalysisReport } from '../../shared'

export const data = ref<AnalysisReport | null>()

export async function fetchData() {
  data.value = await fetch('/api/report.json')
    .then(r => r.json())
  return data.value
}

function uniq<T>(data: T[]): T[] {
  return Array.from(new Set(data))
}

export const root = computed(() => data.value?.root || '')
export const fullClasses = computed(() => data.value?.files.flatMap(i => i.classes) || [])
export const classes = computed(() => uniq(fullClasses.value).sort())
export const files = computed(() => data.value?.files.map(i => i.filepath) || [])

function countArray<T>(arr: T[], element: T): number {
  let num = 0
  arr.forEach((i) => {
    if (i === element)
      num += 1
  })
  return num
}

export function getClassInfo(name: MaybeRef<string>) {
  return {
    files: computed(() =>
      data.value?.files
        .filter(i => i.classes.includes(unref(name)))
        .map(i => i.filepath) || [],
    ),
    count: computed(() => countArray(fullClasses.value, unref(name))),
  }
}
