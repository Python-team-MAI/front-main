import type { Metadata } from 'next'
import './[locale]/globals.css'

export const metadata: Metadata = {
    title: 'MAI Students',
    description: 'From MAI Student for MAI Students',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return children
}
