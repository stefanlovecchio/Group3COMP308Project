import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  build: { target: 'esnext', // or 'es2022' }, optimizeDeps: { esbuildOptions: { target: 'esnext', // or 'es2022' },
  },
    plugins: [
        react(),
        federation({
            name: 'vitalSignsMicroFrontend',
            filename: 'remoteEntry1.js', 
            exposes: {
                './src/components/VitalSigns.jsx': './src/main.jsx', 
            },

            shared: {
    react: {
      singleton: true, 
      
    },
    'react-dom': {
      singleton: true,
      
    },
  },

        }),
    ],
    server: {
        port: 5002, 
        cors: true, 
    },
});
