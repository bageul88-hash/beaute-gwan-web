import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#b8924a',
          light: '#d4af6e',
          dim: '#7a6030',
          bg: '#fdf3e7',
        },
        dark: {
          DEFAULT: '#0e0c08',
          2: '#1a1710',
          3: '#252117',
        },
        cream: {
          DEFAULT: '#f7f4ef',
          2: '#edeae3',
          3: '#e5e0d8',
        },
      },
      fontFamily: {
        display: ['"Noto Serif KR"', 'serif'],
        body: ['"Noto Sans KR"', 'sans-serif'],
      },
      borderRadius: {
        sm: '8px',
        md: '14px',
        lg: '20px',
        pill: '999px',
      },
    },
  },
  plugins: [],
}

export default config
