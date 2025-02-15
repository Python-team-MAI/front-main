'use client'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import Image from 'next/image'
import { Link, useRouter } from '@/navigation'
import React, { FC } from 'react'
import moment from 'moment'
import { ThemeSwitcher } from '@/widgets/ThemeSwitcher'
import { LanguageSwitcher } from '@/widgets/LanguageSwitcher'
import { UserAvatar } from '@/widgets/UserAvatar'
import { Button } from '@nextui-org/button'
import { useTranslations } from 'next-intl'
import { Session } from 'next-auth'

interface LongHeaderProps {
    session: Session | null
}

export const LongHeader: FC<LongHeaderProps> = ({ session }) => {
    const router = useRouter()
    const t = useTranslations()

    return (
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
    )
}
