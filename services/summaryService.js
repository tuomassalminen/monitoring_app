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

const getAveragesFromPeriod = async(firstDay, lastDay, userId) => {
    const morningResult = await executeQuery(
        'SELECT AVG(sleep_duration) AS sleep_duration, AVG(sleep_quality) AS sleep_quality, AVG(mood) AS mood FROM morning_reports WHERE user_id = $1 AND date BETWEEN $2 AND $3',
        userId, firstDay, lastDay
    )

    const eveningResult = await executeQuery(
        'SELECT AVG(sports_time) AS sports_time, AVG(study_time) AS study_time, AVG(mood) AS mood FROM evening_reports WHERE user_id = $1 AND date BETWEEN $2 AND $3',
        userId, firstDay, lastDay
    )
    const morningAverages = morningResult.rowsOfObjects()[0]
    const eveningAverages = eveningResult.rowsOfObjects()[0]

    const moodAverage = () => {
        if (morningAverages.mood && eveningAverages.mood) {
            return (Number(morningAverages.mood) + Number(eveningAverages.mood)) / 2
        }
        if (morningAverages.mood) {
            return morningAverages.mood
        }
        if (eveningAverages.mood) {
            return eveningAverages.mood
        }
    }

    return {
        sleepDuration: morningAverages.sleep_duration,
        sleepQuality: morningAverages.sleep_quality,
        sportsTime: eveningAverages.sports_time,
        studyTime: eveningAverages.study_time,
        mood: moodAverage()
    }
}

const getAverageMoodForDate = async(date, userId) => {
    const morningResult = await executeQuery(
        'SELECT mood FROM morning_reports WHERE user_id = $1 AND date = $2',
        userId, date
    )
    const eveningResult = await executeQuery(
        'SELECT mood FROM evening_reports WHERE user_id = $1 AND date = $2',
        userId, date
    )
    let morningMood = null
    let eveningMood = null
    if (morningResult.rowCount > 0) {
        morningMood = morningResult.rowsOfObjects()[0].mood
    }
    if (eveningResult.rowCount > 0) {
        eveningMood = eveningResult.rowsOfObjects()[0].mood
    }
    if (morningMood && eveningMood) {
        return (Number(morningMood) + Number(eveningMood)) / 2
    } else if (morningMood) {
        return Number(morningMood)
    } else if (eveningMood) {
        return Number(eveningMood)
    } else {
        return null
    }
}

export {
    getAveragesFromPeriod,
    periodHasEntries,
    getAverageMoodForDate
}
