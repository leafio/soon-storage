import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
export default defineConfig({

  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'index',
      fileName: 'index',
    },
  }, plugins: [
    dts({ tsconfigPath: './tsconfig.build.json' })
  ],
})
