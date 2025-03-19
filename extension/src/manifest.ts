import { defineManifest } from '@crxjs/vite-plugin';
import { version } from '../package.json';

const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name: `${env.mode === 'development' ? '[Dev] ' : ''}Boolcheck`,
  description: 'Browser Extension',
  version,
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['content/index.tsx'],
    },
  ],
  background: {
    service_worker: 'background/index.ts',
  },
  host_permissions: ['<all_urls>'],
  action: {},
  web_accessible_resources: [
    {
      resources: ['boolcheckPopup.html'],
      matches: ['<all_urls>'],
    },
  ],
  icons: {
    '16': 'images/extension_16.png',
    '32': 'images/extension_32.png',
    '48': 'images/extension_48.png',
    '128': 'images/extension_128.png',
  },
  permissions: ['tabs'],
}));

export default manifest;
