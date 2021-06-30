import { promises as fs, existsSync } from 'fs'
import type Connect from 'connect'
import { UserOptions } from 'vite-plugin-windicss'
import { AnalysisOptions, AnalysisReturn, runAnalysis } from './analysis'

let analysisReturn: AnalysisReturn | undefined

export function ApiMiddleware(
  windicssOptions: UserOptions = {},
  analysisOptions: AnalysisOptions = {},
): Connect.NextHandleFunction {
  return async(req, res, next) => {
    if (!req.url)
      return next()

    const fullpath = req.url
    const [path, queryString = ''] = fullpath.split('?', 2)
    const query = new URLSearchParams(queryString)

    if (path === '/report.json') {
      if (!analysisReturn || query.has('force'))
        analysisReturn = await runAnalysis(windicssOptions, analysisOptions)
      res.write(JSON.stringify(analysisReturn.result))
      return res.end()
    }
    else if (path === '/interpret') {
      if (!analysisReturn)
        analysisReturn = await runAnalysis(windicssOptions, analysisOptions)
      const name = query.get('name') || ''
      res.write(analysisReturn.utils.processor.interpret(name).styleSheet.build())
      return res.end()
    }
    else if (path === '/read') {
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
