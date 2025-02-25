'use client'

import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/navigation'
import { FC, useState } from 'react'
import { addToast } from '@heroui/toast'
import { isEmail } from '@/shared/validation/isEmail'
import { $fetch } from '@/fetch'

interface AuthFormProps {
    type: 'login' | 'register'
}

export const AuthForm: FC<AuthFormProps> = ({ type }) => {
    const t = useTranslations()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const onLogin = async () => {
        if (!email || !password) {
            addToast({ title: t('no email or password') })
            return
        }

        if (!isEmail(email)) {
            addToast({ title: t('wrong email'), description: t('type right email') })
            return
        }

        try {
            setIsLoading(true)
            const res = await $fetch(type === 'login' ? `/auth/login/` : `/auth/register/`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            })

            if (res.status === 200) {
                if (type === 'login') {
                    router.push('/')
                } else {
                    router.push('/register/info')
                }
                return
            }
        } catch (e) {
            console.log(e)
            addToast({ color: 'danger', title: t('wrong password or email') })
        } finally {
            setIsLoading(true)
        }
    }

    return (
        <form className="flex flex-col gap-2 w-full" action={onLogin}>
            <Input
                required
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={t('email')}
                name="email"
                id="email"
                type="email"
            />
            <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
                label={t('password')}
                name="password"
                id="password"
                type="password"
            />
            <Button isLoading={isLoading} color="primary" className="w-full" type="submit">
                {t('sign in')}
            </Button>
        </form>
    )
}
