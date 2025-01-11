import { Link, Locale, redirect } from '@/navigation'
import { signIn, providerMap } from '@/auth'
import { AuthError } from 'next-auth'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useTranslations } from 'next-intl'
import { Link as NextUILink } from '@nextui-org/link'

export default function SignInPage(props: {
    searchParams: { callbackUrl: string | undefined }
    params: { locale: Locale }
}) {
    const t = useTranslations()

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5 justify-center items-stretch w-1/6 max-md:w-1/2">
                <h1 className="text-2xl text-center">{t('registration')}</h1>
                <form
                    className="flex flex-col gap-2"
                    action={async (formData) => {
                        'use server'
                        try {
                            await signIn('credentials', formData)
                        } catch (error) {
                            if (error instanceof AuthError) {
                                return redirect({ href: `/?error=${error.type}`, locale: props.params.locale })
                            }
                            throw error
                        }
                    }}
                >
                    <Input className="w-full" label={t('email')} name="email" id="email" type="email" />
                    <Input className="w-full" label={t('password')} name="password" id="password" type="password" />
                    <Button color="primary" className="w-full" type="submit">
                        {t('register')}
                    </Button>
                </form>
                <div className="flex flex-col justify-center gap-2">
                    {Object.values(providerMap).map((provider) => (
                        <form
                            key={provider.id}
                            action={async () => {
                                'use server'
                                try {
                                    await signIn(provider.id, {
                                        redirectTo: props.searchParams?.callbackUrl ?? '',
                                    })
                                } catch (error) {
                                    if (error instanceof AuthError) {
                                        return redirect({ href: `/?error=${error.type}`, locale: props.params.locale })
                                    }

                                    throw error
                                }
                            }}
                        >
                            <Button className="w-full" type="submit">
                                <span>
                                    {t('sign in with')} {provider.name}
                                </span>
                            </Button>
                        </form>
                    ))}
                </div>
            </div>
            <Link href={{ pathname: '/login' }}>
                <NextUILink as={'div'} className="text-center m-4">
                    {t('login')}
                </NextUILink>
            </Link>
        </main>
    )
}
