import { defineConfig } from '@playwright/test'

const port = 3111
const baseURL = process.env.BASE_URL ?? `http://localhost:${port}`

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL },
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: `pnpm start -p ${port}`,
        url: baseURL,
        reuseExistingServer: true,
        timeout: 60_000,
      },
})
