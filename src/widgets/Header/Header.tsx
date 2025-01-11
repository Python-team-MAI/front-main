'use client'

import { Link, usePathname } from '@/navigation'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/navbar'
import { ThemeSwitcher } from './ThemeSwitcher'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

export const Header = () => {
    const pathname = usePathname()
    const t = useTranslations()
    const { theme } = useTheme()

    if (pathname === '/login' || pathname === '/register') {
        return (
            <Navbar shouldHideOnScroll>
                <NavbarBrand>
                    <Image
                        width={70}
                        src={theme !== 'dark' ? '/logo/light_logo.png' : '/logo/dark_logo.png'}
                        alt="logo"
                    />
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
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <Image width={70} src={theme === 'dark' ? '/logo/dark_logo.png' : '/logo/light_logo.png'} alt="logo" />
                <p className="font-bold text-inherit">MAI Students</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="#">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
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
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    )
}
