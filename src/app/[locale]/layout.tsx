import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { Providers } from './providers'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Locale, routing } from '@/navigation'
import { Header } from '@/widgets/Header'
import './globals.css'
import { auth } from '@/auth'

const roboto = Roboto({ subsets: ['cyrillic', 'latin'], weight: ['500', '700', '900'] })

export const metadata: Metadata = {
    title: 'MAI Students',
    description: 'From MAI Student for MAI Students',
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode
    params: Promise<{ locale: Locale }>
}>) {
    const { locale } = await params
    if (!routing.locales.includes(locale)) {
        notFound()
    }

    const messages = await getMessages()
    const session = await auth()

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${roboto.className} antialiased`}>
                <Providers locale={locale} messages={messages}>
                    <Header session={session} />
                    <div className="px-40 max-sm:p-0">{children}</div>
                </Providers>
            </body>
        </html>
    )
}
