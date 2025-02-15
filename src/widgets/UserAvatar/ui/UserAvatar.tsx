import { Avatar } from '@nextui-org/react'
import { Session } from 'next-auth'
import { Link } from '@/entities/i18n/routing'
import React, { FC } from 'react'

interface UserAvatarProps {
    session: Session
}

export const UserAvatar: FC<UserAvatarProps> = ({ session }) => {
    const avatarImage = session.user?.image
    return (
        <Link href={'/profile'}>
            <Avatar isBordered color="primary" src={avatarImage || 'F'} showFallback={!avatarImage} />
        </Link>
    )
}
