import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({

  plugins: [
    react(),
    federation({
      name: 'authMicroFrontend',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/AuthApp.jsx', 
      },
      shared: {
    react: {
      singleton: true, 
      requiredVersion: '18.2.0',
    },
    'react-dom': {
      singleton: true, 
      requiredVersion: '18.2.0',     
    },
    'jsonwebtoken': {     
      singleton: true, 
      requiredVersion: '^9.0.2', 
    },
    '@apollo/client': {
      singleton: true, 
      requiredVersion: '3.11.10', 
    },
    'graphql': {
      singleton: true, 
      requiredVersion: '16.9.0', 
    },
  },
    }),
    nodePolyfills({
      include: ['crypto', 'process', 'stream', 'util'],
      globals: { global: true, process: true },
    }),
  ],
  server: {
    port: 5001,
    serveStatic: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    outDir: 'dist/assets',
  },

});
