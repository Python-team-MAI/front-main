'use client'

import { usePathname } from '@/entities/i18n/routing'
import { Session } from 'next-auth'
import { FC } from 'react'
import { ShortHeader } from './components/ShortHeader'
import { TabBar } from './components/TabBar'
import { LongHeader } from './components/LongHeader'

interface HeaderProps {
    session: Session | null
}

export const Header: FC<HeaderProps> = ({ session }) => {
    const pathname = usePathname()

    if (pathname === '/login' || pathname === '/register') {
        return <ShortHeader />
    }

    return (
        <>
            <LongHeader session={session} />
            <TabBar />
        </>
    )
}
