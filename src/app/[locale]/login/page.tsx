import { Link, Locale, redirect } from '@/navigation'
import { signIn, providerMap } from '@/auth'
import { AuthError } from 'next-auth'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Link as NextUILink } from '@nextui-org/link'
import { getTranslations } from 'next-intl/server'

export default async function SignInPage(props: {
    searchParams: Promise<{ callbackUrl: string | undefined }>
    params: Promise<{ locale: Locale }>
}) {
    const { locale } = await props.params
    const { callbackUrl } = await props.searchParams
    const t = await getTranslations({ locale })

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5 justify-center items-stretch w-1/6 max-md:w-1/2">
                <h1 className="text-2xl text-center">{t('login')}</h1>
                <form
                    className="flex flex-col gap-2"
                    action={async (formData) => {
                        'use server'
                        try {
                            await signIn('credentials', formData)
                        } catch (error) {
                            if (error instanceof AuthError) {
                                return redirect({ href: `/?error=${error.type}`, locale })
                            }
                            throw error
                        }
                    }}
                >
                    <Input className="w-full" label={t('email')} name="email" id="email" type="email" />
                    <Input className="w-full" label={t('password')} name="password" id="password" type="password" />
                    <Button color="primary" className="w-full" type="submit">
                        {t('sign in')}
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
                                        redirectTo: callbackUrl ?? '',
                                    })
                                } catch (error) {
                                    if (error instanceof AuthError) {
                                        return redirect({ href: `/?error=${error.type}`, locale })
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
            <Link href={{ pathname: '/register' }}>
                <NextUILink as={'div'} className="text-center m-4">
                    {t('registration')}
                </NextUILink>
            </Link>
        </main>
    )
}
