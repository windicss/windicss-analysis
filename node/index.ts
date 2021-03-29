import http from 'http'
import { resolve } from 'path'
import connect from 'connect'
import open from 'open'
import serveStatic from 'serve-static'
import { ApiMiddleware } from './middleware'

export * from './middleware'
export * from './analysis'

export function startServer(port = 5432) {
  const app = connect()
  const url = `http://localhost:${port}`

  app.use(ApiMiddleware())
  app.use(serveStatic(resolve(__dirname, '../dist/app')))

  http.createServer(app).listen(port)

  open(url)
  console.log(`Windi Analyser started at ${url}`)
  return app
}
