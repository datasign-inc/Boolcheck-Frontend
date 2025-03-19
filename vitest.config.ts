import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // "extension" 配下のテストを無視する
        exclude: ['extension/**/*'],
        // ※必要に応じて "include" で実行したいテストファイルを明示的に指定することもできます
        include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    },
});