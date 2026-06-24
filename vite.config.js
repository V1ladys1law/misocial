import { defineConfig } from 'vite'
import { resolve } from 'path'
import { mkdirSync } from 'fs'
import tailwindcss from '@tailwindcss/vite'
import pugPlugin from '@macropygia/vite-plugin-pug-static'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const createStructure = () => ({
  name: 'create-structure',
  buildStart() {
    const dirs = [
      'src/components',
      'src/scripts',
      'src/data',
      'src/styles/components',
      'src/assets/images',
      'src/assets/fonts',
      'src/assets/icons',
    ]
    dirs.forEach(dir => mkdirSync(dir, { recursive: true }))
  },
  writeBundle() {
    const outDirs = [
      'docs/assets/images',
      'docs/assets/fonts',
      'docs/assets/icons',
      'docs/assets/js',
    ]
    outDirs.forEach(dir => mkdirSync(dir, { recursive: true }))
  }
})

export default defineConfig({
  root: 'src',
  base: './',

  plugins: [
    createStructure(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        { src: 'assets/images/*', dest: 'assets/images' },
      ],
    }),
    pugPlugin({
      buildLocals: {
        siteName: 'site name',
        currentYear: new Date().getFullYear(),
      },
      buildOptions: {
        basedir: resolve(process.cwd(), 'src'),
        pretty: true,
      },
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '@components': resolve(process.cwd(), 'src/components'),
      '@styles': resolve(process.cwd(), 'src/styles'),
      '@assets': resolve(process.cwd(), 'src/assets'),
      '@scripts': resolve(process.cwd(), 'src/scripts'),
      '@fonts': resolve(process.cwd(), 'src/fonts'),
    },
  },

  build: {
    outDir: '../docs',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.pug'),
        app: resolve(__dirname, 'src/main.js'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/styles.css'
          }
          if (assetInfo.name && /\.(woff2?|ttf|otf|eot)$/.test(assetInfo.name)) {
            return 'assets/fonts/[name][extname]'
          }
          if (assetInfo.name && /\.(png|jpe?g|gif|svg|webp)$/.test(assetInfo.name)) {
            return 'assets/images/[name][extname]'
          }
          return 'assets/[name][extname]'
        },
        chunkFileNames: 'assets/js/[name].js',
        entryFileNames: 'assets/js/[name].js',
      },
    },
  },

  server: {
    port: 3000,
    host: true,
    open: true,
  },

})
