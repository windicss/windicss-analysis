import { useLocalStorage } from '@vueuse/core'

export const editor = useLocalStorage('windicss-analysis-editor', 'vscode')
