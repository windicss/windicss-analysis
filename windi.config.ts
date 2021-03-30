import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  shortcuts: {
    'bg-background': 'bg-white dark:bg-[#111]',
    'subheader': 'my-4 uppercase opacity-50 text-sm',
    'container': 'max-w-[60em] m-auto px-6 py-10 lg:px-2',
    'duotone-border': 'border-gray-200 dark:border-true-gray-700',
  },
  theme: {
    extend: {
      fontFamily: {
        mono: '"Fira Code", monospace',
      },
      colors: {
        primary: (colors.lightBlue as any)['400'],
      },
    },
  },
})
