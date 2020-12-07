import { executeQuery } from '../database/database.js'

const getReports = async() => {
    const res = await executeQuery("SELECT * FROM evening_reports");
    return res.rowsOfObjects()
}

const getReportByDate = async(date, userId) => {
    const res = await executeQuery("SELECT * FROM evening_reports WHERE date=$1 AND user_id=$2", date, userId)
    if (res) {
        return res.rowsOfObjects()
    }
    return []
}

const addReport = async(report) => {
    await executeQuery('DELETE FROM evening_reports WHERE date = $1 AND user_id = $2', report.date, report.userId)
    
    await executeQuery(
        'INSERT INTO evening_reports (study_time, sports_time, eating_quality, mood, date, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
        report.studyTime, report.sportsTime, report.eatingQuality, report.mood, report.date, report.userId
    )
}

export { 
    getReports,
    getReportByDate,
    addReport
};