//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'
//import path from 'node:path';                        // node:path works in ESM

//export default defineConfig({
//  plugins: [react()],
//  resolve: {
//    alias: {
//      '@microsoft/botframework-webchat-adapter-azure-communication-chat': path.resolve(__dirname, 'node_modules', '@microsoft', 'botframework-webchat-adapter-azure-communication-chat', 'dist', 'chat-adapter.js'),
//      '@microsoft/botframework-webchat-adapter-azure-communication-chat/package.json': path.resolve(__dirname, 'node_modules', '@microsoft', 'botframework-webchat-adapter-azure-communication-chat', 'package.json'),
//      '@fluentui/react': path.resolve(__dirname, 'node_modules', '@microsoft', 'omnichannel-chat-components', 'node_modules', '@fluentui', 'react')
//    }
//  }
//});


// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: [
      // ✅ Fluent UI must resolve from the root node_modules (not inside @microsoft/omnichannel-chat-components)
      { find: '@fluentui/react', replacement: path.resolve(__dirname, 'node_modules', '@fluentui', 'react') },
      // Optional: quiet deep-imports like "@fluentui/react/lib/Button"
      { find: '@fluentui/react/lib', replacement: path.resolve(__dirname, 'node_modules', '@fluentui', 'react', 'lib') },

      // ✅ Pin the adapter package name to its built entry file (so the bare import resolves in dev)
      { find: '@microsoft/botframework-webchat-adapter-azure-communication-chat',
        replacement: path.resolve(
          __dirname,
          'node_modules',
          '@microsoft',
          'botframework-webchat-adapter-azure-communication-chat',
          'dist',
          'chat-adapter.js'           // <-- concrete file to load
        )
      },

      // ✅ Make sure the SDK's "require('<package>/package.json')" for telemetry resolves to a real file
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

    // Optional: help resolution for packages with non-standard fields
    mainFields: ['module', 'browser', 'main']
  },

  // Tell Vite's optimizer NOT to pre-bundle the adapter (we're pinning its file entry manually)
  optimizeDeps: {
    exclude: ['@microsoft/botframework-webchat-adapter-azure-communication-chat'],
    include: ['@fluentui/react', '@fluentui/react/lib/Button']
  },
  
  // This maps any `global` identifier to the browser's `globalThis`
  define: {
    global: 'globalThis'
  }

});