import { executeQuery } from '../database/database.js'

const periodHasEntries = async(firstDay, lastDay, userId) => {
    const morningResult = await executeQuery(
        'SELECT * FROM morning_reports WHERE user_id = $1 AND date BETWEEN $2 AND $3',
        userId, firstDay, lastDay
    )
    const eveningResult = await executeQuery(
        'SELECT * FROM evening_reports WHERE user_id = $1 AND date BETWEEN $2 AND $3',
        userId, firstDay, lastDay
    )

    return (morningResult.rowCount > 0) || (eveningResult.rowCount > 0)
}

const getReportAmountFromPeriod = async(firstDay, lastDay, userId) => {
    let rowCount = 0
    if (userId) {
        const morningResult = await executeQuery(
            'SELECT * FROM morning_reports WHERE user_id = $1 AND date BETWEEN $2 AND $3',
            userId, firstDay, lastDay
        )
        const eveningResult = await executeQuery(
            'SELECT * FROM evening_reports WHERE user_id = $1 AND date BETWEEN $2 AND $3',
            userId, firstDay, lastDay
        )
        rowCount += morningResult.rowCount
        rowCount += eveningResult.rowCount
    } else {
        const morningResult = await executeQuery(
            'SELECT * FROM morning_reports WHERE date BETWEEN $1 AND $2',
            firstDay, lastDay
        )
        const eveningResult = await executeQuery(
            'SELECT * FROM evening_reports WHERE date BETWEEN $1 AND $2',
            firstDay, lastDay
        )
        rowCount += morningResult.rowCount
        rowCount += eveningResult.rowCount
    }
    if (rowCount === 0) {
        return 1
    }
    return rowCount
}

const moodAverage = (morningSum, eveningSum, reportAmount) => {

    if (morningSum && eveningSum) {
        return (Number(morningSum) + Number(eveningSum)) / reportAmount
    }
    if (morningSum) {
        return Number(morningSum) / reportAmount
    }
    if (eveningSum) {
        return Number(eveningSum) / reportAmount
    }
    return null
}

const getAveragesFromPeriod = async(firstDay, lastDay, userId) => {
    const morningResult = await executeQuery(
        'SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, SUM(mood) AS mood_sum FROM morning_reports WHERE user_id = $1 AND date BETWEEN $2 AND $3',
        userId, firstDay, lastDay
    )

    const eveningResult = await executeQuery(
        'SELECT AVG(sports_time) AS sports_time, AVG(study_time) AS study_time, SUM(mood) AS mood_sum FROM evening_reports WHERE user_id = $1 AND date BETWEEN $2 AND $3',
        userId, firstDay, lastDay
    )
    const morningAverages = morningResult.rowsOfObjects()[0]
    const eveningAverages = eveningResult.rowsOfObjects()[0]

    const reportAmount = await getReportAmountFromPeriod(firstDay, lastDay, userId)

    return {
        sleepDuration: morningAverages.sleep_duration,
        sleepQuality: morningAverages.sleep_quality,
        sportsTime: eveningAverages.sports_time,
        studyTime: eveningAverages.study_time,
        mood: moodAverage(morningAverages.mood_sum, eveningAverages.mood_sum, reportAmount)
    }
}

const getAveragesOfAll = async(firstDay, lastDay) => {
    const morningResult = await executeQuery(
        'SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, SUM(mood) AS mood_sum FROM morning_reports WHERE date BETWEEN $1 AND $2',
        firstDay, lastDay
    )

    const eveningResult = await executeQuery(
        'SELECT AVG(sports_time) AS sports_time, AVG(study_time) AS study_time, SUM(mood) AS mood_sum FROM evening_reports WHERE date BETWEEN $1 AND $2',
        firstDay, lastDay
    )
    const morningAverages = morningResult.rowsOfObjects()[0]
    const eveningAverages = eveningResult.rowsOfObjects()[0]

    const reportAmount = await getReportAmountFromPeriod(firstDay, lastDay)

    return {
        sleepDuration: morningAverages.sleep_duration,
        sleepQuality: morningAverages.sleep_quality,
        sportsTime: eveningAverages.sports_time,
        studyTime: eveningAverages.study_time,
        mood: moodAverage(morningAverages.mood_sum, eveningAverages.mood_sum, reportAmount)
    }
}

const getAverageMoodForDate = async(date) => {
    const morningResult = await executeQuery(
        'SELECT SUM(mood) AS mood_sum FROM morning_reports WHERE date = $1',
        date
    )
    const eveningResult = await executeQuery(
        'SELECT SUM(mood) AS mood_sum FROM evening_reports WHERE date = $1',
        date
    )

    let morningMoodSum = null
    let eveningMoodSum = null

    if (morningResult.rowCount > 0) {
        morningMoodSum = morningResult.rowsOfObjects()[0].mood_sum
    }
    if (eveningResult.rowCount > 0) {
        eveningMoodSum = eveningResult.rowsOfObjects()[0].mood_sum
    }

    const reportAmount = await getReportAmountFromPeriod(date, date)

    return moodAverage(morningMoodSum, eveningMoodSum, reportAmount)

}

export {
    getAveragesFromPeriod,
    periodHasEntries,
    getAverageMoodForDate,
    getAveragesOfAll,
    getReportAmountFromPeriod
}
