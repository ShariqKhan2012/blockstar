import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
///require ('dotenv').config({path: '../.env'});
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //envCompatible(),
  ],
  resolve: {
    alias: {
      web3: 'web3/dist/web3.min.js',
    },
    // or
    alias: [
      {
        find: 'web3',
        replacement: 'web3/dist/web3.min.js',
      },
    ],
  },
})
