import http from 'http'
import { resolve } from 'path'
import connect from 'connect'
import openUrl from 'open'
import serveStatic from 'serve-static'
import { tryPort } from '../shared'
import { ApiMiddleware } from './middleware'

export * from './middleware'
export * from './analysis'
export * from '../shared'

export interface Options {
  port?: number
  open?: boolean
  root?: string
}

export async function startServer(options: Options = {}) {
  const {
    open = true,
    root = process.cwd(),
  } = options

  const port = await tryPort(options.port || 8113)
  const app = connect()
  const url = `http://localhost:${port}`

  app.use(ApiMiddleware({
    root,
  }))
  app.use(serveStatic(resolve(__dirname, '../dist/app')))

  http.createServer(app).listen(port)

  if (open)
    openUrl(url)
  console.log(`Windi Analyser started at ${url}`)
  return app
}
