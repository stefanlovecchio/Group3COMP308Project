import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'shellApp',
      remotes: {
        authMicroFrontend: 'http://localhost:5001/assets/remoteEntry.js', 
        vitalSignsMicroFrontend: 'http://localhost:5002/assets/remoteEntry1.js',
      },
      shared: ['react', 'react-dom', '@apollo/client', 'graphql'],
    }),
  ],
  server: {
    port: 5173, 
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
