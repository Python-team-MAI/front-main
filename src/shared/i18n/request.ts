import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale
    console.log(locale)

    if (!locale || !routing.locales.includes(locale as 'ru' | 'en' | 'ch')) {
        locale = routing.defaultLocale
    }

    return {
        locale,
        messages: (await import(`../../../messages/${locale}.json`)).default,
    }
})