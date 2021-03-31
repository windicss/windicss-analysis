import { HighlightRule, UtilityInfo } from './types'
import { toArray } from './utils'

export const defaultRules: HighlightRule[] = [
  {
    name: 'important',
    regex: /^!/,
    classes: 'dark:text-red-400 text-red-600',
  },
  {
    name: 'shortcut',
    category: 'shortcut',
    classes: 'dark:text-teal-400 text-teal-600',
  },
  {
    name: 'implicit-infer',
    regex: [
      /[0-9](?:em|px|rem|vw|vh|cm)$/,
      /-hex-/,
    ],
    classes: 'dark:text-orange-400 text-orange-600',
  },
  {
    name: 'explicit-infer',
    regex: /\[.*\]/,
    classes: 'dark:text-green-400 text-green-600',
  },
  {
    name: 'decimal',
    regex: /\d\.\d/,
    classes: 'dark:text-yellow-400 text-yellow-600',
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
