import { flatColors, hex2RGB } from './tools'

export function parseColor(
  value: string,
  map: any,
) {
  let color: string | undefined
  let name: string | undefined
  if (map && typeof map === 'object') {
    const colors = flatColors(map)
    const body = value
      .replace(/^ring-offset|outline-solid|outline-dotted/, 'head')
      .replace(/^\w+-/, '')
    if (body in colors) {
      color = colors[body] as string
      if (Array.isArray(color))
        color = color[0]
      name = body
    }
    else if (body.startsWith('hex-')) {
      const hex = body.slice(4)
      if (hex2RGB(hex)) {
        color = `#${hex}`
        name = body
      }
    }
    else if (body.startsWith('[#') && body.endsWith(']')) {
      const hex = body.slice(2, -1)
      if (hex2RGB(hex)) {
        color = `#${hex}`
        name = body
      }
    }
  }
  return { color, name }
}
