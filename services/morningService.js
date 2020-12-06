import { executeQuery } from '../database/database.js'
import { getToday } from '../utils.js'

const getMorningReports= async() => {
    const res = await executeQuery("SELECT * FROM morning_reports");
    return res.rowsOfObjects(); 
}

const getTodaysMorningReport = async() => {
    const res = await executeQuery("SELECT * FROM morning_reports WHERE date=$1", getToday())
    if (res) {
        return res.rowsOfObjects()
    }
    return []
}

const addMorningReport = async(report) => {
    await executeQuery('DELETE FROM morning_reports WHERE date = $1', report.date)
    await executeQuery(
        'INSERT INTO morning_reports (sleep_duration, sleep_quality, mood, date, user_id) VALUES ($1, $2, $3, $4, $5)',
        report.sleepDuration, report.sleepQuality, report.mood, report.date, report.userId
    )
}

export { 
    getMorningReports, 
    addMorningReport,
    getTodaysMorningReport
};