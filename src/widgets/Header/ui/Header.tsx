'use client'

import { usePathname } from '@/entities/i18n/routing'
import { ShortHeader } from './components/ShortHeader'
import { TabBar } from './components/TabBar'
import { LongHeader } from './components/LongHeader'

export const Header = ({}) => {
    const pathname = usePathname()

    if (pathname === '/login' || pathname === '/register') {
        return <ShortHeader />
    }

    return (
        <>
            <LongHeader />
            <TabBar />
        </>
    )
}
