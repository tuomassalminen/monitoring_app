import * as summaryService from '../../services/summaryService.js'
import * as utils from '../../utils.js'

const getData= async(userId, request) => {
    let data = {

    }
    if (request) {
        const body = request.body()
        const params = await body.value

        data.month = params.get('month')
        data.week = params.get('week')
    } else {
        data.month = utils.getDefaultMonth()
        data.week = utils.getDefaultWeek()
    }
    const monthDates = utils.getDatesFromMonth(data.month)
    const weekDates = utils.getDatesFromWeek(data.week)
    let weekAverages = null
    let monthAverages = null
    if (await summaryService.periodHasEntries(monthDates.startDate, monthDates.endDate, userId)) {
        monthAverages = await summaryService.getAveragesFromPeriod(monthDates.startDate, monthDates.endDate, userId)
    }
    if (await summaryService.periodHasEntries(weekDates.startDate, weekDates.endDate, userId)) {
        weekAverages = await summaryService.getAveragesFromPeriod(weekDates.startDate, weekDates.endDate, userId)
    }
    if (weekAverages) {
       for (const [key, value] of Object.entries(weekAverages)) {
           if (value === null) {
               weekAverages[`${key}`] = 'No info collected'
           } else {
               weekAverages[`${key}`] = Number(value).toFixed(2)
           }
       }
    }
    if (monthAverages) {
       for (const [key, value] of Object.entries(monthAverages)) {
           if (value === null) {
               monthAverages[`${key}`] = 'No info collected'
            } else {
                monthAverages[`${key}`] = Number(value).toFixed(2)
            }
       }
    }
    data.weekAverages = weekAverages
    data.monthAverages = monthAverages
    return data
}



const showSummaryPage = async({render, session}) => {
    const user = await session.get('user')
    const data = await getData(user.id)
    render('summary.ejs', data);
}

const postChangeDate = async({render, response, request, session}) => {
    const user = await session.get('user')
    const data = await getData(user.id, request)
    render('summary.ejs', data)
}
  
export { showSummaryPage, postChangeDate };