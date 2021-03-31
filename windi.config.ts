import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'

export default defineConfig({
  extract: {
    include: [
      'src/**/*.{vue,ts}',
      'shared/**/*.{vue,ts}',
    ],
  },
  shortcuts: {
    'bg-background': 'bg-$background',
    'subheader': 'my-4 uppercase opacity-50 text-sm',
    'container': 'max-w-[60em] m-auto px-6 py-10 lg:px-2',
    'duotone-border': 'border-gray-200 dark:border-true-gray-700',
    'icon-button': '!outline-none opacity-40 hover:!opacity-75 inline-block my-auto',
    'button': 'px-2 py-1 rounded bg-gray-400 opacity-80 bg-opacity-10 !outline-none hover:(bg-primary text-primary bg-opacity-10 opacity-100) active:(ring-1 ring-primary)',
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
