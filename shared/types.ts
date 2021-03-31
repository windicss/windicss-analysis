import type { Shortcut } from 'windicss/types/interfaces'

export interface FileInfo {
  filepath: string
  utilities: string[]
}

export interface UtilityInfo {
  count: number
  full: string
  base: string
  type?: string
  category?: string
  value?: string
  variants?: string[]
  important?: boolean
  colorName?: string
  colorHex?: string
  css?: string
  shortcut?: Shortcut
}

export interface BaseInfo {
  count: number
  base: string
  variants?: string[]
}

export interface ColorInfo {
  name: string
  hex: string
  utilities: string[]
  variants: string[]
}

export interface AnalysisReport {
  root: string
  name?: string
  version?: string
  include: string[]
  exclude: string[]
  files: FileInfo[]
  colors: Record<string, ColorInfo>
  utilities: Record<string, UtilityInfo>
  bases: Record<string, BaseInfo>
  shortcuts: Record<string, Shortcut>
  dist: {
    gzip: string
  }
}
