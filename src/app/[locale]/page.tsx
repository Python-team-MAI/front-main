import { auth } from '@/auth'
import { Locale, redirect } from '@/navigation'

export default async function Home({ params: { locale } }: { params: { locale: Locale } }) {
    const session = await auth()
    if (!session) return redirect({ locale, href: '/login' })

    return <>Привет бро</>
}
