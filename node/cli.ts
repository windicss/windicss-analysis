import { resolve } from 'path'
import { promises as fs } from 'fs'
import cac from 'cac'
import { version } from '../package.json'
import { runAnalysis } from './analysis'
import { startServer } from './index'

const cli = cac()

cli
  .option('--port <port>', 'Port', {
    default: 8113,
  })
  .option('--open', 'Open in browser', {
    default: true,
  })
  .option('-o, --output [filepath]', 'Output analysis result to JSON file')
  .help()
  .version(version)

const parsed = cli.parse()

async function run() {
  const root = resolve(cli.args[0] || process.cwd())
  if (parsed.options.output) {
    if (parsed.options.output === true)
      parsed.options.output = 'windicss-analysis-result.json'
    await fs.writeFile(
      parsed.options.output,
      JSON.stringify((await runAnalysis({ root })).result, null, 2),
      'utf-8',
    )
  }
  else {
    await startServer({
      ...parsed.options,
      root: resolve(cli.args[0] || process.cwd()),
    })
  }
}

run()
