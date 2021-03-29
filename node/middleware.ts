import { promises as fs, existsSync } from 'fs'
import type Connect from 'connect'
import { UserOptions } from 'vite-plugin-windicss'
import { AnalysisReport, runAnalysis } from './analysis'

const urlPrefix = '/api/'
let analysisReport: AnalysisReport | undefined

export function ApiMiddleware(windicssOptions: UserOptions = {}): Connect.NextHandleFunction {
  return async(req, res, next) => {
    if (!req.url?.startsWith(urlPrefix))
      return next()

    const fullpath = req.url.slice(urlPrefix.length)
    const [path, queryString = ''] = fullpath.split('?', 2)
    const query = new URLSearchParams(queryString)

    // console.log(path, query)

    if (path === 'report.json') {
      if (!analysisReport)
        analysisReport = await runAnalysis(windicssOptions)
      res.write(JSON.stringify(analysisReport))
      return res.end()
    }
    if (path === 'read') {
      const filepath = query.get('path')
      if (!filepath || !existsSync(filepath)) {
        res.statusCode = 404
        return res.end()
      }
      try {
        res.write(await fs.readFile(filepath, 'utf-8'))
        return res.end()
      }
      catch (e) {
        console.error(e)
        res.statusCode = 500
        return res.end()
      }
    }

    res.statusCode = 404
    res.end()
  }
}
