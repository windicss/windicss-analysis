import http from 'http'
import { resolve } from 'path'
import connect from 'connect'
import openUrl from 'open'
import serveStatic from 'serve-static'
import { ApiMiddleware } from './middleware'

export * from './middleware'
export * from './analysis'

export interface Options {
  port?: number
  open?: boolean
  root?: string
}

export function startServer(options: Options = {}) {
  const {
    port = 5432,
    open = true,
    root = process.cwd(),
  } = options

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
