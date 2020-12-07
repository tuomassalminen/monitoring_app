import { executeQuery } from '../database/database.js'

const getReports= async() => {
    const res = await executeQuery("SELECT * FROM morning_reports");
    return res.rowsOfObjects(); 
}

const getReportByDate = async(date, userId) => {
    const res = await executeQuery("SELECT * FROM morning_reports WHERE date=$1 AND user_id = $2", date, userId);
    if (res) {
        return res.rowsOfObjects()
    }
    return []
}


const addReport = async(report) => {
    await executeQuery('DELETE FROM morning_reports WHERE date = $1 AND user_id = $2', report.date, report.userId)
    await executeQuery(
        'INSERT INTO morning_reports (sleep_duration, sleep_quality, mood, date, user_id) VALUES ($1, $2, $3, $4, $5)',
        report.sleepDuration, report.sleepQuality, report.mood, report.date, report.userId
    )
}



export { 
    getReports, 
    addReport,
    getReportByDate
};