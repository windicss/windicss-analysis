import { generateBuild } from '../node'

generateBuild({
  demo: true,
  root: process.cwd(),
  outDir: 'windicss-analysis-report',
})
