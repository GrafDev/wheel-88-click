import { defineConfig } from 'vite'
import { VERSION } from './version.js'

export default defineConfig({
    server: {
        open: true,
        port: 5173
    },
    resolve: {
        alias: {
            '@': '/src',
            '@assets': '/src/assets',
            '@images': '/src/assets/images',
            '@js': '/src/assets/js',
            '@css': '/src/assets/css'
        }
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        cssCodeSplit: true,
        cssMinify: true,
        rollupOptions: {
            input: {
                main: '/index.html'
            },
            output: {
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.')[1];
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        return `assets/images/[name]-${VERSION}-[hash][extname]`;
                    }
                    return `assets/${extType}/[name]-${VERSION}-[hash][extname]`;
                },
                chunkFileNames: `assets/js/[name]-${VERSION}-[hash].js`,
                entryFileNames: `assets/js/[name]-${VERSION}-[hash].js`
            }
        }
    },
    css: {
        devSourcemap: true
    },
    define: {
        __APP_VERSION__: JSON.stringify(VERSION)
    }
})
