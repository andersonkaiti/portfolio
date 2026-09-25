import { encode } from 'qss'

export function getPreviewSrc(url: string | null | undefined): string | null {
  if (!url) {
    return null
  }

  return `https://api.microlink.io/?${encode({
    url,
    screenshot: true,
    meta: false,
    embed: 'screenshot.url',
    colorScheme: 'dark',
    'viewport.isMobile': false,
    'viewport.deviceScaleFactor': 1,
    'viewport.width': 1920,
    'viewport.height': 1080,
    waitUntil: 'networkidle0',
    waitFor: 2000,
  })}`
}
