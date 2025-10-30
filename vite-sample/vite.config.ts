import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function virtualAcsAdapter() {
  // a virtual module id
  const VIRTUAL_ID = '\0virtual:acs-adapter';
  const PKG = '@microsoft/botframework-webchat-adapter-azure-communication-chat';

  return {
    name: 'virtual-acs-adapter',
    // whenever Vite (or esbuild) tries to resolve that package, return our virtual id
    resolveId(source: string) {
      if (source === PKG) return VIRTUAL_ID;
    },
    // and serve a tiny no-op module
    load(id: string) {
      if (id === VIRTUAL_ID) {
        return `
          export class SDKProvider {}
          export default {};
        `;
      }
    }
  };
}

export default defineConfig({
  plugins: [
    virtualAcsAdapter(),   // <- must come BEFORE react so it wins resolution
    react(),
  ],
  server: { host: true, port: 5173, hmr: { clientPort: 443 } }, // Codespaces-friendly
  preview: { host: true, port: 4173 },
  optimizeDeps: {
    // ensure esbuild doesn't try to prebundle the real ACS adapter
    exclude: ['@microsoft/botframework-webchat-adapter-azure-communication-chat'],
    include: [
      '@microsoft/omnichannel-chat-sdk',
      '@microsoft/omnichannel-chat-widget',
      '@microsoft/ocsdk',
    ],
    esbuildOptions: {
      supported: { 'dynamic-import': true },
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto',
    }
  },
  resolve: {
    mainFields: ['module', 'browser', 'main'],
    conditions: ['browser', 'module', 'import', 'default'],
  }
});

