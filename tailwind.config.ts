import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        maincolor: {
          50: '#cacdcf',
          100: '#ffba08',
          200: '#faa307',
          300: '#f48c06',
          400: '#e85d04',
          500: '#dc2f02',
          600: '#d00000',
          700: '#9d0208',
          800: '#6a040f',
          900: '#370617',
          950: '#03071e',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
export default config

// #edf2f4