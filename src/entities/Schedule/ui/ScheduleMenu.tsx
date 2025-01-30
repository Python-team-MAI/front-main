import { getDayOfWeek } from '@/shared/lib/getDayOfWeek'
import { FC } from 'react'
import { useRouter } from '@/navigation'
import moment from 'moment'

interface ScheduleMenuProps {
    time: string
    currentDate: moment.Moment
    locale: string
    group: string
    setDate: React.Dispatch<React.SetStateAction<moment.Moment>>
}

export const ScheduleMenu: FC<ScheduleMenuProps> = ({ time, currentDate, group, setDate }) => {
    const router = useRouter()

    return (
        <div
            onClick={() => {
                setDate(moment(time, 'DD.MM.YYYY'))
                router.replace(`/schedule/?date=${time}&group=${group}`)
            }}
            className={`flex flex-col min-w-14 min-h-14 justify-center items-center rounded-md border ${
                currentDate.format('DD.MM.YYYY') === time ? 'border-[--tw-ring-color] border-large' : ''
            }`}
        >
            <p className="text-xs">{getDayOfWeek(time)}</p>
            <p className="text-lg">{time.split('.')[0]}</p>
        </div>
    )
}
