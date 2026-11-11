import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function lucideDirectImports(): Plugin {
  return {
    name: 'lucide-direct-imports',
    enforce: 'pre',
    transform(code, id) {
      if (!/[/\\]src[/\\]/.test(id) || !code.includes('lucide-react')) return null;
      const next = code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g, (_match, names: string) =>
        names
          .split(',')
          .map((part) => part.trim())
          .filter(Boolean)
          .map((part) => {
            const [icon, alias] = part.split(/\s+as\s+/);
            const file = icon
              .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
              .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
              .replace(/([a-zA-Z])(\d)/g, '$1-$2')
              .toLowerCase();
            return `import ${alias || icon} from 'lucide-react/dist/esm/icons/${file}.js';`;
          })
          .join('\n'),
      );
      return next === code ? null : next;
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [lucideDirectImports(), react()],
  optimizeDeps: {
    esbuildOptions: {
      minify: true,
    },
  },
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: ['**/public/products/**', '**/public/banners/**'],
    },
  },
  preview: {
    port: 3000,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 1200,
  },
});
