import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // import plugin
import 'dayjs/locale/hu' // import locale
dayjs.extend(relativeTime)
dayjs.locale('hu') // use locale

export default dayjs