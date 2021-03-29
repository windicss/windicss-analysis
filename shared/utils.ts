import http from 'http'

export function uniq<T>(data: T[]): T[] {
  return Array.from(new Set(data))
}

export function countElement<T>(arr: T[], element: T): number {
  let num = 0
  arr.forEach((i) => {
    if (i === element)
      num += 1
  })
  return num
}

function isPortFree(port: number) {
  return new Promise((resolve) => {
    const server = http.createServer()
      .listen(port, () => {
        server.close()
        resolve(true)
      })
      .on('error', () => {
        resolve(false)
      })
  })
}

export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function tryPort(start = 4000): Promise<number> {
  if (await isPortFree(start))
    return start
  return tryPort(start + 1)
}

export function getFileExt(path: string) {
  return path.slice(path.lastIndexOf('.') + 1).toLowerCase()
}
