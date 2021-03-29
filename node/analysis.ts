import { promises as fs } from 'fs'
import { createUtils, UserOptions } from '@windicss/plugin-utils'
import type { Shortcut } from 'windicss/types/interfaces'
import { countElement, AnalysisReport, FileInfo, UtilityInfo, BaseInfo } from '../shared'

const NAME = 'windicss-analysis'

export async function runAnalysis(userOptions: UserOptions = {}): Promise<AnalysisReport> {
  const utils = createUtils(userOptions, { name: NAME })
  await utils.init()

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

  const utilityNames = utils.processor.interpret(files.flatMap(i => i.classes).join(' ')).success

  files.forEach(i => i.classes = i.classes.filter(c => utilityNames.includes(c)))

  const allUsages = files.flatMap(i => i.classes)

  const utilitiesList = utilityNames.map<UtilityInfo>(i => ({
    count: countElement(allUsages, i),
    base: i,
    full: i,
    ...parseUtility(i),
    shortcut: shortcuts[i],
  }))

  const utilities = Object.fromEntries(utilitiesList.map(i => [i.full, i]))

  const baseNames = utilitiesList.filter(u => u.base === u.full && !u.shortcut).map(u => u.base)
  const bases = Object.fromEntries(
    baseNames.map<[string, BaseInfo]>(i => [i, {
      count: utilitiesList.filter(u => u.base === i).reduce((a, b) => a.count + b.count, { count: 0 } as any),
      base: i,
      variants: utilitiesList.filter(u => u.base === i).map(i => i.full),
    }]),
  )

  return {
    root: utils.options.root,
    include: utils.options.scanOptions.include,
    exclude: utils.options.scanOptions.exclude,
    files,
    utilities,
    shortcuts,
    bases,
  }
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

  return info
}

export * from '../shared/types'
