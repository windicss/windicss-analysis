export interface FileInfo {
  filepath: string
  classes: string[]
}

export interface AnalysisReport {
  root: string
  include: string[]
  exclude: string[]
  files: FileInfo[]
}

export interface UtilityInfo {
  count: number
  base: string
  value?: string
  variants?: string[]
  important?: boolean
  colorName?: string
  colorHex?: string
}
