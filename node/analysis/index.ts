import { promises as fs, existsSync } from 'fs'
import { join } from 'path'
import { createUtils, UserOptions, WindiPluginUtils } from '@windicss/plugin-utils'
import type { Shortcut } from 'windicss/types/interfaces'
import gzipSize from 'gzip-size'
import fileSize from 'filesize'
import { countElement, AnalysisReport, FileInfo, UtilityInfo, BaseInfo, uniq } from '../../shared'
import { parseUtility } from './parse'

const NAME = 'windicss-analysis'

export interface AnalysisOptions {
  interpertUtilities?: boolean
}

export interface AnalysisReturn {
  result: AnalysisReport
  utils: WindiPluginUtils
}

export async function runAnalysis(
  userOptions: UserOptions = {},
  options: AnalysisOptions = {},
): Promise<AnalysisReturn> {
  const {
    interpertUtilities = false,
  } = options

  const utils = createUtils(userOptions, { name: NAME })
  await utils.init()

  const root = utils.options.root
  const files: FileInfo[] = []
  for (const filepath of await utils.getFiles()) {
    let code = await fs.readFile(filepath, 'utf-8')
    code = utils.transformGroups(code)
    const { classes } = await utils.applyExtractors(code, filepath)
    files.push({
      utilities: classes || [],
      filepath,
    })
  }

  const shortcuts: Record<string, Shortcut> = utils.processor.config('shortcuts') || {} as any

  const { success: utilityNames, styleSheet } = utils.processor.interpret(files.flatMap(i => i.utilities).join(' '))

  files.forEach(i => i.utilities = i.utilities.filter(c => utilityNames.includes(c)))

  const allUsages = files.flatMap(i => i.utilities)

  const utilitiesList = utilityNames.map<UtilityInfo>(i => ({
    count: countElement(allUsages, i),
    base: i,
    full: i,
    ...parseUtility(i, utils.processor),
  }))

  if (interpertUtilities) {
    utilitiesList.forEach((i) => {
      i.css = utils.processor.interpret(i.full).styleSheet.build()
    })
  }

  const utilities = Object.fromEntries(utilitiesList.map(i => [i.full, i]))

  const baseNames = uniq(utilitiesList.map(u => u.base))
  const bases = Object.fromEntries(
    baseNames.map<[string, BaseInfo]>(i => [i, {
      count: utilitiesList.filter(u => u.base === i).reduce((a, b) => a.count + b.count, { count: 0 } as any),
      base: i,
      variants: utilitiesList.filter(u => u.base === i).map(i => i.full),
    }]),
  )

  const css = styleSheet.build().replace(/[\s\n]+/gm, '')
  const size = await gzipSize(css)

  const colors = Object.fromEntries(
    uniq(utilitiesList.map(u => u.colorName).filter(i => i))
      .map(i => [i, {
        name: i,
        hex: utilitiesList.find(u => u.colorName === i)?.colorHex,
        utilities: utilitiesList.filter(u => u.colorName === i).map(i => i.full),
      }]),
  )

  const result: AnalysisReport = {
    root,
    include: utils.options.scanOptions.include,
    exclude: utils.options.scanOptions.exclude,
    colors,
    files,
    utilities,
    shortcuts,
    bases,
    dist: {
      gzip: fileSize(size),
    },
  }

  const packageJsonPath = join(root, 'package.json')
  if (existsSync(packageJsonPath)) {
    const { name, version } = JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'))
    result.name = name
    result.version = version
  }

  return {
    result,
    utils,
  }
}
