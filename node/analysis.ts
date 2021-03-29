import { promises as fs } from 'fs'
import { createUtils, UserOptions } from '@windicss/plugin-utils'
import { AnalysisReport, FileInfo } from '../shared/types'

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

  const { success } = utils.processor.interpret(files.flatMap(i => i.classes).join(' '))

  files.forEach(i => i.classes = i.classes.filter(c => success.includes(c)))

  return {
    root: utils.options.root,
    include: utils.options.scanOptions.include,
    exclude: utils.options.scanOptions.exclude,
    files,
  }
}

// runAnalysis()
//   .then((data) => {
//     fs.writeFile('public/output.json', JSON.stringify(data, null, 2), 'utf-8')
//   })

export * from '../shared/types'
