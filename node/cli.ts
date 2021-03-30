import { resolve } from 'path'
import { promises as fs } from 'fs'
import cac from 'cac'
import { version } from '../package.json'
import { runAnalysis } from './analysis'
import { startServer } from './server'
import { generateBuild } from './build'

const cli = cac('windicss-analysis')

cli
  .help()
  .version(version)
  .option('--port <port>', 'Port', { default: 8113 })
  .option('--open', 'Open in browser', { default: true })
  .option('--json [filepath]', 'Output analysis result file in JSON')
  .option('--html [dir]', 'Output analysis result in static web app', { default: false })

const parsed = cli.parse()

async function run() {
  const root = resolve(cli.args[0] || process.cwd())
  if (parsed.options.help)
    return

  if (parsed.options.html) {
    if (parsed.options.html === true)
      parsed.options.html = resolve(root, 'windicss-analysis-report')
    await generateBuild({
      root,
      outDir: parsed.options.html,
    })
  }
  else if (parsed.options.json) {
    if (parsed.options.json === true)
      parsed.options.json = 'windicss-analysis-report.json'

    await fs.writeFile(
      parsed.options.json,
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
