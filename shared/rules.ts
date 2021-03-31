import { HighlightRule, UtilityInfo } from './types'
import { toArray } from './utils'

export const defaultRules: HighlightRule[] = [
  {
    name: 'important',
    regex: /^!/,
    classes: 'text-red-400',
  },
  {
    name: 'shortcut',
    category: 'shortcut',
    classes: 'text-teal-400',
  },
  {
    name: 'implicit-infer',
    regex: [
      /[0-9](?:em|px|rem|vw|vh|cm)$/,
      /-hex-/,
    ],
    classes: 'text-orange-400',
  },
  {
    name: 'explicit-infer',
    regex: /\[.*\]/,
    classes: 'text-green-400',
  },
  {
    name: 'prefixed',
    regex: /\:/,
    classes: '',
  },
]

export function matchRule(info: UtilityInfo, rules: HighlightRule[] = defaultRules): HighlightRule | undefined {
  if (!info)
    return
  for (const rule of rules) {
    if (rule.category && rule.category === info.category)
      return rule

    if (rule.regex) {
      const regexes = toArray(rule.regex).map(i => typeof i === 'string' ? new RegExp(i, 'i') : i)
      for (const regex of regexes) {
        if (info.full.match(regex))
          return rule
      }
    }
  }
}
