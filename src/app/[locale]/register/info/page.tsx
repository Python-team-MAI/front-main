import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useTranslations } from 'next-intl'
import React from 'react'

// first/last_name, bio, course, group_name, institute
const InfoPage = () => {
    const t = useTranslations()

    return (
        <main className="min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5 justify-center items-stretch w-1/4 max-md:w-1/2">
                <h1 className="text-2xl text-center">{t('info page')}</h1>
                <form
                    className="flex flex-col gap-2"
                    action={async (formData) => {
                        'use server'
                        const email = formData.get('email')
                        const password = formData.get('password')
                        console.log(email, password)
                    }}
                >
                    <Input className="w-full" label={t('email')} name="first_name" id="first_name" type="name" />
                    <Input className="w-full" label={t('password')} name="last_name" id="last_name" type="last_name" />
                    <Input className="w-full" label={t('password')} name="bio" id="bio" />
                    <Input className="w-full" label={t('password')} name="course" id="last_name" />
                    <Input className="w-full" label={t('password')} name="institute" id="institute" />
                    <Input className="w-full" label={t('password')} name="last_name" id="last_name" />

                    <Button color="primary" className="w-full" type="submit">
                        {t('sign up')}
                    </Button>
                </form>
            </div>
        </main>
    )
}

export default InfoPage
