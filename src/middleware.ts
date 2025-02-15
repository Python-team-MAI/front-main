import createMiddleware from 'next-intl/middleware'
import { routing } from './entities/i18n/routing'

export default createMiddleware(routing)

export const config = {
    matcher: ['/', '/(ru|en|ch)/:path*'],
}
