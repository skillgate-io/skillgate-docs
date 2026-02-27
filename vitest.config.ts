import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    reporters: ['verbose'],
    coverage: {
      provider: 'v8',
      include: ['src/lib/chat-*.ts'],
      reporter: ['text', 'lcov'],
    },
  },
});
