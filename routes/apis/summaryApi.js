import * as summaryService from '../../services/summaryService.js'
import { getToday, getWeekAgo, getDateAsString } from '../../utils.js' 

const getDataForLastWeek = async({response}) => {
    const averages = await summaryService.getAveragesOfAll(getWeekAgo(), getToday())
    response.body = averages
}
const getDataForDate = async({response, params}) => {
    if (
        params.year && params.month && params.day
        && !isNaN(params.year) && !isNaN(params.month) && !isNaN(params.day)
    ) {
        const date = new Date(params.year, Number(params.month) - 1, Number(params.day) + 1)
        const dateAsString = getDateAsString(date)
        const averages = await summaryService.getAveragesOfAll(dateAsString, dateAsString)
        response.body = averages
    } else {
        response.body = {
            error: 'Invalid parameters (should be of form /api/:year/:month/:day)'
        }
    }
    
}

export {
    getDataForLastWeek,
    getDataForDate
}
