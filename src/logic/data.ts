import { MaybeRef } from '@vueuse/core'
import { computed, ref, unref } from 'vue'
import { AnalysisReport, uniq } from '../../shared'

export const data = ref<AnalysisReport | null>()

export async function fetchData() {
  data.value = await fetch('/api/report.json')
    .then(r => r.json())
  return data.value
}

export const name = computed(() => {
  let name = data.value?.name
  if (name && data.value?.version)
    name += `@${data.value?.version}`
  if (!name)
    name = data.value?.root
  return name
})

export const root = computed(() => data.value?.root || '')
export const fullClasses = computed(() => data.value?.files.flatMap(i => i.classes) || [])
export const classes = computed(() => Object.keys(data.value?.utilities || {}).sort())
export const files = computed(() => data.value?.files.map(i => i.filepath) || [])

export function getClassInfo(name: MaybeRef<string>) {
  const utility = data.value?.utilities[unref(name)]
  const base = utility?.base ? data.value?.bases[utility.base] : undefined
  return {
    ...utility,
    baseCount: base?.count,
    files: data.value?.files
      .filter(i => i.classes.includes(unref(name)))
      .map(i => i.filepath) || [],
  }
}

export const topUtilities = computed(() => {
  return Object.values(data.value?.utilities || {})
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map(i => i.base)
})

export const categories = computed(() => {
  if (!data.value)
    return []
  return uniq(Object.values(data.value.utilities)
    .flatMap(u => u.category)
    .filter(Boolean)) as string[]
})

export const categorized = computed(() => {
  if (!data.value)
    return {}

  return categories.value.map(i => ({
    name: i,
    classes: Object.values(data.value!.utilities)
      .filter(u => u.category === i)
      .map(i => i.full),
  }))
})
