'use client'
import React, { useState } from 'react'
import { Schedule, ScheduleDayCard, ScheduleMenu } from '@/entities/Schedule'
import moment from 'moment'

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
    console.log(schedule)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { group, ...scheduleDays } = schedule

    return (
        <div>
            <div className="flex mb-3 overflow-x-auto scrollbar-hide gap-3">
                {Object.keys(scheduleDays).map((time) => (
                    <ScheduleMenu
                        group={groupName}
                        key={time}
                        locale="ru"
                        currentDate={currentDate}
                        time={time}
                        setDate={setCurrentDate}
                    />
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
