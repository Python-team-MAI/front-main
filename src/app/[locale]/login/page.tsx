import { Link, Locale } from '@/entities/i18n/routing'
import { GithubOAuthButton, GoogleOAuthButton, YandexOAuthButton } from '@/widgets/AuthButtons'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Link as NextUILink } from '@nextui-org/link'
import { getTranslations } from 'next-intl/server'

export default async function SignInPage(props: {
    searchParams: Promise<{ callbackUrl: string | undefined }>
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await props.params
    // const { callbackUrl } = await props.searchParams
    const t = await getTranslations({ locale })

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5 justify-center items-stretch w-1/4 max-md:w-1/2">
                <h1 className="text-2xl text-center">{t('login')}</h1>
                <form
                    className="flex flex-col gap-2"
                    action={async (formData) => {
                        'use server'
                        const email = formData.get('email')
                        const password = formData.get('password')
                        console.log(email, password)
                    }}
                >
                    <Input className="w-full" label={t('email')} name="email" id="email" type="email" />
                    <Input className="w-full" label={t('password')} name="password" id="password" type="password" />
                    <Button color="primary" className="w-full" type="submit">
                        {t('sign in')}
                    </Button>
                </form>
                <div className="flex flex-col gap-1 items-center justify-stretch">
                    <GithubOAuthButton />
                    <GoogleOAuthButton />
                    <YandexOAuthButton />
                </div>
            </div>
            <Link href={{ pathname: '/register' }}>
                <NextUILink as={'div'} className="text-center m-4">
                    {t('registration')}
                </NextUILink>
            </Link>
        </main>
    )
}
