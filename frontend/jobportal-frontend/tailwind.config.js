/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1F2E',
        paper: '#FAF8F4',
        paperdim: '#F1EDE3',
        amber: '#E8A33D',
        confirmed: '#3F7E5C',
        clay: '#B5533C',
        slate: '#6B7280',
        line: '#E4DFD3',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
