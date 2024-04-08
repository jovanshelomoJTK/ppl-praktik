/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
export default defineConfig(
    {
        test: {
            reporters: [
                'default',
                'html',
                'json',
                'junit',
            ],
            coverage: {
                enabled: true,
                provider: 'v8',
                reporter: ['text', 'json', 'html'],
                reportsDirectory: './html/coverage',
                exclude: ["index.js", "html"]
            },
            outputFile: {
                json: 'test-results.json',
                junit: 'test-results.xml'
            },
        }
    }
)