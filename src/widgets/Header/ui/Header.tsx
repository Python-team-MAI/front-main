'use client'

import { usePathname } from '@/entities/i18n/routing'
import { ShortHeader } from './components/ShortHeader'
import { TabBar } from './components/TabBar'
import { LongHeader } from './components/LongHeader'
import { FC } from 'react'

interface HeaderProps {
    isShort?: boolean
}

export const Header: FC<HeaderProps> = ({ isShort }) => {
    const pathname = usePathname()

    if (pathname === '/login' || pathname === '/register' || pathname === '/register/info' || isShort) {
        return <ShortHeader />
    }

    return (
        <>
            <LongHeader />
            <TabBar />
        </>
    )
}
