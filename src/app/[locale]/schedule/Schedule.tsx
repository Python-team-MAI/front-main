'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Schedule, ScheduleDayCard, ScheduleMenu } from '@/entities/Schedule'
import moment from 'moment'
import { useTranslations } from 'next-intl'

export const ScheduleClient = ({
    schedule,
    groupName,
    date,
}: {
    schedule: Schedule
    groupName: string
    date: string
}) => {
    const [currentDate, setCurrentDate] = useState<moment.Moment>(moment(date, 'DD.MM.YYYY'))
    const t = useTranslations()
    const scrollDateDiv = useRef<HTMLDivElement | null>(null)
    const scheduleElem = useRef<HTMLDivElement | null>(null)
    const [canScroll, setCanScroll] = useState(true)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { group, ...scheduleDays } = schedule
    const times = Object.keys(scheduleDays)

    useEffect(() => {
        if (canScroll) {
            setCurrentDate(moment(date, 'DD.MM.YYYY'))
            const elemWidth = scheduleElem.current?.getBoundingClientRect().width
            const firstDay = moment(times[0], 'DD.MM.YYYY')
            const differenceDays = Math.abs(moment(date, 'DD.MM.YYYY').diff(firstDay, 'day'))
            scrollDateDiv.current?.scroll({ left: 0, behavior: 'instant' })
            scrollDateDiv.current?.scroll({ left: (elemWidth || 0 + 13) * differenceDays, behavior: 'smooth' })
        } else {
            setCanScroll(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])

    return (
        <div>
            <div className="flex mb-3 overflow-x-auto scrollbar-hide gap-3" ref={scrollDateDiv}>
                {times.map((time, i) => (
                    <React.Fragment key={time}>
                        {moment(times?.[i - 1], 'DD.MM.YYYY').get('month') !==
                            moment(time, 'DD.MM.YYYY').get('month') && (
                            <p className="text-gray-500 text-center" style={{ writingMode: 'vertical-lr' }}>
                                {t(moment(time, 'DD.MM.YYYY').get('month') + '-month')}
                            </p>
                        )}
                        <ScheduleMenu
                            ref={scheduleElem}
                            group={groupName}
                            locale="ru"
                            currentDate={currentDate}
                            time={time}
                            setDate={(date) => {
                                setCurrentDate(date)
                                setCanScroll(false)
                            }}
                        />
                    </React.Fragment>
                ))}
            </div>
            {scheduleDays[currentDate.format('DD.MM.YYYY')] ? (
                <ScheduleDayCard day={scheduleDays[currentDate.format('DD.MM.YYYY')]} />
            ) : (
                <div className="flex p-2 justify-center items-center">
                    <p className="text-lg">Выходной!</p>
                </div>
            )}
        </div>
    )
}
