module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    'bg-red-100',
    'bg-red-500',
    'bg-red-600',
    'text-red-500',
    'border-red-500',

    'bg-green-100',
    'bg-green-500',
    'bg-green-600',
    'text-green-500',
    'border-green-500',

    'bg-orange-100',
    'bg-orange-500',
    'bg-orange-600',
    'text-orange-500',
    'border-orange-500',

    'bg-[#00c9b7]',
    'hover:bg-[#36b1a0]',

    'bg-[#9106cd]',
    'hover:bg-[#850cb9]',

    'text-black',
    'bg-gray-400',
    'bg-gray-300',
    'bg-gray-100',

    'peer-checked:bg-green-500',
    'peer-checked:bg-gray-300',
    'after:bg-white',
    'after:bg-gray-400',
  ],
  theme: {
    extend: {
      /*keyframes: {
        spinner: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          }
        }
      }*/
    },
  },
  plugins: [],
}