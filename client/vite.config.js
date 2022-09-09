import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
///require ('dotenv').config({path: '../.env'});
import path, { resolve } from 'path'
//import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    base: mode == 'development' ? '/' : '/showcase/dappstar/',
    //base: '/projects/',
    plugins: [
      react(),
      //envCompatible(),
    ],
    resolve: {
      alias: {
        web3: 'web3/dist/web3.min.js',
        "@": path.resolve(__dirname, "./src"),
      },
      /*
      // or
      alias: [
        {
          find: 'web3',
          replacement: 'web3/dist/web3.min.js',
        },
      ],*/
    },
  }
})
