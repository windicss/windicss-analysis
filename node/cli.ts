import cac from 'cac'
import { startServer } from './index'

const cli = cac()

cli
  .option('--port <type>', 'Port', {
    default: 5432,
  })
  .option('--open', 'Open server in ', {
    default: true,
  })

const parsed = cli.parse()

startServer({
  ...parsed.options,
  root: cli.args[0] || process.cwd(),
})
