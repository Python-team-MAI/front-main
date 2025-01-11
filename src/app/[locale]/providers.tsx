'use client'
import { Locale } from '@/shared/i18n/routing'
import { NextUIProvider } from '@nextui-org/react'
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl'
import { ThemeProvider } from 'next-themes'

export function Providers({
    children,
    messages,
    locale,
}: {
    children: React.ReactNode
    messages: AbstractIntlMessages
    locale: Locale
}) {
    console.log(locale)
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <NextUIProvider>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    {children}
                </ThemeProvider>
            </NextUIProvider>
        </NextIntlClientProvider>
    )
}
