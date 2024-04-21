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
                reporter: ['json', 'html'],
                reportsDirectory: './html/coverage',
                include: ["src/**/*.js"],
            },
            outputFile: {
                json: 'test-results.json',
                junit: 'test-results.xml'
            },
        }
    }
)