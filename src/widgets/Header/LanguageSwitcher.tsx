'use client'
import { Button } from '@nextui-org/button'
import { usePathname, useRouter } from '@/navigation'
import React from 'react'
import { useLocale } from 'next-intl'

export const LanguageSwitcher = () => {
    const router = useRouter()
    const pathname = usePathname()
    const locale = useLocale()

    const handleLocaleChange = () => {
        router.push(pathname, { locale: locale === 'en' ? 'ru' : locale === 'ru' ? 'ch' : 'en' })
    }

    return <Button onPress={handleLocaleChange}>{locale.toLocaleUpperCase()}</Button>
}
