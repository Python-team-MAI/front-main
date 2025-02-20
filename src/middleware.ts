import createMiddleware from 'next-intl/middleware'
import { routing } from './entities/i18n/routing'
import { NextRequest, NextResponse } from 'next/server'
import { SESSION_TOKEN } from './shared/constants/tokens'

export default async function middleWare(request: NextRequest) {
    const sessionToken = request.cookies.get(SESSION_TOKEN)
    const pathname = request.nextUrl.pathname
    let locale
    console.log('token', sessionToken)

    switch (pathname.slice(0, 4)) {
        case '/ru':
            locale = 'ru'
            break
        case '/en':
            locale = 'en'
            break
        case '/ch':
            locale = 'ch'
            break
        case '/ru/':
            locale = 'ru'
            break
        case '/en/':
            locale = 'en'
            break
        case '/ch/':
            locale = 'ch'
            break
        default:
            locale = 'ru'
            break
    }

    if (
        !sessionToken &&
        request.nextUrl.pathname !== `/${locale}/login` &&
        request.nextUrl.pathname !== `/${locale}/register`
    ) {
        return NextResponse.redirect(new URL(`/${locale || 'en'}/login`, request.url))
    }

    return createMiddleware(routing)(request)
}

export const config = {
    matcher: ['/(ru|en|ch)/:path*'],
}
