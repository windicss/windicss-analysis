import { resolve } from 'path'
import cac from 'cac'
import { version } from '../package.json'
import { startServer } from './index'

const cli = cac()

cli
  .option('--port <port>', 'Port', {
    default: 8113,
  })
  .option('--open', 'Open server in ', {
    default: true,
  })
  .help()
  .version(version)

const parsed = cli.parse()

startServer({
  ...parsed.options,
  root: resolve(cli.args[0] || process.cwd()),
})
