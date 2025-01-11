import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Providers } from './providers'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Locale, routing } from '@/navigation'
import { Header } from '@/widgets/Header'
import './globals.css'

const roboto = Roboto({ weight: ['500', '700', '900'] })

export const metadata: Metadata = {
    title: 'MAI Students',
    description: 'From MAI Student for MAI Students',
}

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode
    params: { locale: Locale }
}>) {
    if (!routing.locales.includes(locale)) {
        notFound()
    }

    const messages = await getMessages()
    console.log(messages)

    return (
        <html lang={locale}>
            <body className={`${roboto.className} antialiased`}>
                <Providers locale={locale} messages={messages}>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
