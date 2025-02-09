import moment from 'moment'

export function getWeekRange(dateString: string) {
    const date = moment(dateString, 'DD.MM.YYYY')

    const startOfWeek = date.clone().startOf('isoWeek')
    const endOfWeek = date.clone().endOf('isoWeek')

    return {
        start: startOfWeek.format('DD.MM.YYYY'),
        end: endOfWeek.format('DD.MM.YYYY'),
    }
}
