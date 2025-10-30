// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Fluent UI resolvers (root node_modules)
      { find: '@fluentui/react', replacement: path.resolve(__dirname, 'node_modules', '@fluentui', 'react') },
      { find: '@fluentui/react/lib', replacement: path.resolve(__dirname, 'node_modules', '@fluentui', 'react', 'lib') },

      // ACS adapter: pin runtime entry
      { find: '@microsoft/botframework-webchat-adapter-azure-communication-chat',
        replacement: path.resolve(
          __dirname,
          'node_modules',
          '@microsoft',
          'botframework-webchat-adapter-azure-communication-chat',
          'dist',
          'chat-adapter.js'
        )
      },

      // ACS adapter: route package.json (used by SDK telemetry)
      { find: '@microsoft/botframework-webchat-adapter-azure-communication-chat/package.json',
        replacement: path.resolve(
          __dirname,
          'node_modules',
          '@microsoft',
          'botframework-webchat-adapter-azure-communication-chat',
          'package.json'
        )
      }
    ],
    mainFields: ['module', 'browser', 'main']
  },
  optimizeDeps: {
    // ✅ PRE-BUNDLE the SDK + its CJS dep so esbuild rewrites require(...) → ESM
    include: [
      '@microsoft/omnichannel-chat-sdk',
      '@microsoft/ocsdk',               // <— correct package name
      '@microsoft/omnichannel-chat-widget',
      '@fluentui/react',
      '@fluentui/react/lib/Button'
    ],
    // We keep the adapter package itself out of the optimizer since we pin its entry above
    exclude: ['@microsoft/botframework-webchat-adapter-azure-communication-chat']
  },
  define: {
    global: 'globalThis'                // browser-safe global shim
  }
});