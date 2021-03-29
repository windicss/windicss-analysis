import type { Shortcut } from 'windicss/types/interfaces'

export interface FileInfo {
  filepath: string
  classes: string[]
}

export interface UtilityInfo {
  count: number
  full: string
  base: string
  category?: string
  value?: string
  variants?: string[]
  important?: boolean
  colorName?: string
  colorHex?: string
  shortcut?: Shortcut
}

export interface BaseInfo {
  count: number
  base: string
  variants?: string[]
}

export interface AnalysisReport {
  root: string
  name?: string
  version?: string
  include: string[]
  exclude: string[]
  files: FileInfo[]
  utilities: Record<string, UtilityInfo>
  bases: Record<string, BaseInfo>
  shortcuts: Record<string, Shortcut>
}
