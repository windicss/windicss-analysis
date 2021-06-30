import http from 'http'
import { resolve } from 'path'
import connect from 'connect'
import openUrl from 'open'
import sirv from 'sirv'
import { cyan, yellow } from 'chalk'
import { tryPort } from '../shared'
import { version } from '../package.json'
import { ApiMiddleware } from './middleware'

export interface ServerOptions {
  port?: number
  open?: boolean
  root?: string
}

export async function startServer(options: ServerOptions = {}) {
  const {
    open = true,
    root = process.cwd(),
  } = options

  const port = await tryPort(options.port || 8113)
  const app = connect()
  const url = `http://localhost:${port}`

  app.use('/api', ApiMiddleware({
    root,
  }))

  app.use(
    sirv(
      resolve(__dirname, '../dist/app'),
      { dev: true, single: true },
    ),
  )

  http.createServer(app).listen(port)

  if (open)
    openUrl(url)

  // eslint-disable-next-line no-console
  console.log(`${cyan`Windi Analyser`} v${version} started at ${yellow(url)}`)

  return app
}
