import { Header } from '@/widgets/Header'
import { getMessages } from 'next-intl/server'
import { Locale, routing } from '@/entities/i18n/routing'
import { Providers } from './[locale]/providers'
import { Button } from '@nextui-org/button'
import { redirect } from 'next/navigation'

const NotFound = async () => {
    const messages = await getMessages({ locale: routing.defaultLocale })

    return (
        <html lang={routing.defaultLocale}>
            <body className={`antialiased `}>
                <Providers locale={routing.defaultLocale as Locale} messages={messages}>
                    <Header isShort />
                    <div className="px-[10vw] max-md:px-2">
                        <div className="flex flex-col gap-3 justify-center items-center my-44 p-5 border rounded-lg">
                            <p className="text-2xl text-center font-bold">404: Страница не найдена</p>
                            <p className="text-xl text-center">Простите, вы перешли на несуществующую страницу</p>

                            <div className="flex w-full justify-evenly gap-3 items-center">
                                <Button
                                    size="lg"
                                    fullWidth
                                    onPress={async () => {
                                        'use server'
                                        redirect('/ru')
                                    }}
                                >
                                    На главную
                                </Button>
                                <Button
                                    size="lg"
                                    fullWidth
                                    onPress={async () => {
                                        'use server'
                                        redirect('/ru/support')
                                    }}
                                >
                                    На страницу техподдержки
                                </Button>
                            </div>
                        </div>
                    </div>
                </Providers>
            </body>
        </html>
    )
}

export default NotFound
