import { executeQuery } from '../database/database.js'

const getMorningReports= async() => {
    const res = await executeQuery("SELECT * FROM morning_reports");
    return res.rowsOfObjects();
    
}

const addMorningReport = async(report) => {
    await executeQuery(
        'INSERT INTO morning_reports (sleep_duration, sleep_quality, mood, date, user_id) VALUES ($1, $2, $3, $4, $5)',
        report.sleepDuration, report.sleepQuality, report.mood, report.date, report.userId
    )
}

export { getMorningReports, addMorningReport };