import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
          name: 'vitalSignsMicroFrontend',
          filename: 'remoteEntry1.js', 
          exposes: {
              './src/components/VitalSigns.jsx': './src/main.jsx', 
              '.main': './src/main.jsx'
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
    ],
    server: {
        port: 5002, 
        cors: true, 
    },
    build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
