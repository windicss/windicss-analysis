import { promises as fs, existsSync } from 'fs'
import { join } from 'path'
import { createUtils, UserOptions } from '@windicss/plugin-utils'
import type { Shortcut } from 'windicss/types/interfaces'
import gzipSize from 'gzip-size'
import { countElement, AnalysisReport, FileInfo, UtilityInfo, BaseInfo, uniq } from '../shared'
import { dynamicUtilities, staticUtilities } from './constants'

const NAME = 'windicss-analysis'

export async function runAnalysis(userOptions: UserOptions = {}): Promise<AnalysisReport> {
  const utils = createUtils(userOptions, { name: NAME })
  await utils.init()

  const root = utils.options.root
  const files: FileInfo[] = []
  for (const filepath of await utils.getFiles()) {
    let code = await fs.readFile(filepath, 'utf-8')
    code = utils.transformGroups(code)
    const { classes } = await utils.applyExtractors(code, filepath)
    files.push({
      classes: classes || [],
      filepath,
    })
  }

  const shortcuts: Record<string, Shortcut> = utils.processor.config('shortcuts') || {} as any

  const { success: utilityNames, styleSheet } = utils.processor.interpret(files.flatMap(i => i.classes).join(' '))

  files.forEach(i => i.classes = i.classes.filter(c => utilityNames.includes(c)))

  const allUsages = files.flatMap(i => i.classes)

  const utilitiesList = utilityNames.map<UtilityInfo>((i) => {
    const info = {
      count: countElement(allUsages, i),
      base: i,
      full: i,
      ...parseUtility(i),
    }
    if (shortcuts[i]) {
      info.shortcut = shortcuts[i]
      info.category = 'shortcut'
    }
    return info
  })

  const utilities = Object.fromEntries(utilitiesList.map(i => [i.full, i]))

  const baseNames = uniq(utilitiesList.map(u => u.base))
  const bases = Object.fromEntries(
    baseNames.map<[string, BaseInfo]>(i => [i, {
      count: utilitiesList.filter(u => u.base === i).reduce((a, b) => a.count + b.count, { count: 0 } as any),
      base: i,
      variants: utilitiesList.filter(u => u.base === i).map(i => i.full),
    }]),
  )

  const css = styleSheet.build()
  const size = await gzipSize(css)

  const result: AnalysisReport = {
    root,
    include: utils.options.scanOptions.include,
    exclude: utils.options.scanOptions.exclude,
    files,
    utilities,
    shortcuts,
    bases,
    dist: {
      gzip: size,
    }
  }

  const packageJsonPath = join(root, 'package.json')
  if (existsSync(packageJsonPath)) {
    const { name, version } = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
    result.name = name
    result.version = version
  }

  return result
}

export function parseUtility(name: string): Partial<UtilityInfo> {
  const info: Partial<UtilityInfo> = { }

  if (name[0] === '!') {
    info.important = true
    name = name.slice(1)
  }
  if (name.includes(':')) {
    const variants = name.split(/:/g)
    info.variants = variants.slice(0, -1)
    name = variants.slice(-1)[0]
  }
  info.base = name
  let [type] = (name.startsWith('-') ? name.slice(1) : name).split('-')

  if (name in staticUtilities) {
    info.category = staticUtilities[name]
    type = name
  }
  else if (type in dynamicUtilities) {
    info.category = dynamicUtilities[type]
  }
  else {
    info.category = 'unknown'
  }
  info.type = type

  return info
}

export * from '../shared/types'
