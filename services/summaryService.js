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

export {
    getAveragesFromPeriod,
    periodHasEntries
}