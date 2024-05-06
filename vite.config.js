import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { splitVendorChunkPlugin } from 'vite';
import { visualizer } from "rollup-plugin-visualizer";
import path from 'path';
import * as r from 'react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), visualizer()],
    server: {
        origin: 'http://localhost:8080',
        open: 'http://localhost:8080'
    },
    build: {
        manifest: true,
        sourcemap: process.env.NODE_ENV == 'prod' || process.env.NODE_ENV == 'production' ? false : 'inline',
        rollupOptions: {
            input: './src/main.jsx',
            output: {
                manualChunks: {
                    chakra: ['@chakra-ui/react', '@chakra-ui/icons', '@emotion/react', '@emotion/styled', '@fontsource/roboto', 'framer-motion'],
                    icons: ['@react-icons/all-files', 'react-icons', 'react-social-login-buttons'],
                    lodash: ['lodash', 'lodash.throttle', 'axios', 'react-select'],
                    react: ['react', 'react-dom', 'react-router-dom', 'core-js', 'react-markdown', 'remark-gfm']
                },
            }
        },

        outDir: '../api/public',
    },

    resolve: {
        alias: {
            'shared': path.resolve(__dirname, '../shared')
        }
    },

})
