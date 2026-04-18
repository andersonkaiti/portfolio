import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

const locales = ['en', 'pt-BR'] as const
type Locale = (typeof locales)[number]

function getBrowserLocale(acceptLanguage: string): Locale {
  if (acceptLanguage.toLowerCase().includes('pt')) return 'pt-BR'
  return 'en'
}

export default getRequestConfig(async () => {
  let locale: Locale = 'en'

  try {
    const cookieStore = await cookies()
    const headerStore = await headers()

    const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value
    locale =
      cookieLocale && (locales as readonly string[]).includes(cookieLocale)
        ? (cookieLocale as Locale)
        : getBrowserLocale(headerStore.get('accept-language') ?? '')
  } catch (_error) {
    // Fallback to 'en' during static generation if cookies/headers are unavailable
    locale = 'en'
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
