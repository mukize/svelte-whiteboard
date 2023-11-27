/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'tokyo-white': '#cfc9c2',
        'tokyo-comment': '#565f89',
        'tokyo-storm': '#24283b',
        'tokyo-green': '#73daca',
        'tokyo-terminal': '#414868',
        'tokyo-magenta': '#bb9af7',
        'tokyo-night': '#1a1b26',
        'tokyo-red': '#f7768e'
      },
    },
  },
  plugins: [],
}

