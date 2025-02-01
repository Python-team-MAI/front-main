'use client'

import { Link, usePathname, useRouter } from '@/navigation'
import { Button } from '@nextui-org/button'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { useTranslations } from 'next-intl'
import { Session } from 'next-auth'
import { FC } from 'react'
import { Tab, Tabs } from '@nextui-org/tabs'
import Image from 'next/image'
import moment from 'moment'
import { ThemeSwitcher } from '../ThemeSwitcher'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { UserAvatar } from '../UserAvatar'

interface HeaderProps {
    session: Session | null
}

export const Header: FC<HeaderProps> = ({ session }) => {
    const pathname = usePathname()
    const t = useTranslations()
    const router = useRouter()

    if (pathname === '/login' || pathname === '/register') {
        return (
            <Navbar shouldHideOnScroll>
                <NavbarBrand onClick={() => router.push('/')} className="cursor-pointer">
                    <Image width={70} height={70} className="max-md:hidden" src={'/logo/light_logo.png'} alt="logo" />
                    <p className="font-bold text-inherit">{t('logo title')}</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <ThemeSwitcher />
                    </NavbarItem>
                    <NavbarItem>
                        <LanguageSwitcher />
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        )
    }

    return (
        <>
            <Navbar shouldHideOnScroll>
                <NavbarBrand onClick={() => router.push('/')} className="cursor-pointer">
                    <Image width={70} height={70} className="max-md:hidden" src={'/logo/light_logo.png'} alt="logo" />
                    <p className="font-bold text-inherit">{t('logo title')}</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link href="/">{t('main')}</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href={`/schedule?date=${moment().format('DD.MM.YYYY')}&group=М8О-101БВ-24`}>
                            {t('schedule')}
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link href="/deadlines">{t('deadlines')}</Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <ThemeSwitcher />
                    </NavbarItem>
                    <NavbarItem>
                        <LanguageSwitcher />
                    </NavbarItem>
                    <NavbarItem>
                        {session ? (
                            <UserAvatar session={session} />
                        ) : (
                            <Button size="sm" as={Link} color="primary" href="#" variant="flat">
                                {t('sign in')}
                            </Button>
                        )}
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            <nav className="mx-2 sm:hidden">
                <Tabs fullWidth>
                    <Tab title={'Главная'}></Tab>
                    <Tab title="Расписание"></Tab>
                    <Tab title="Дедлайны"></Tab>
                </Tabs>
            </nav>
        </>
    )
}
