import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  shortcuts: {
    'subheader': 'mb-4 uppercase opacity-50 text-sm',
    'container': 'max-w-[60em] m-auto px-2 py-10',
    'duotone-border': 'border-gray-200 dark:border-true-gray-700',
  },
  theme: {
    extend: {
      colors: {
        primary: (colors.lightBlue as any)['400'],
      },
    },
  },
})
