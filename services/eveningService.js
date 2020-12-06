import { executeQuery } from '../database/database.js'
import { getToday } from '../utils.js'

const getEveningReports = async() => {
    const res = await executeQuery("SELECT * FROM evening_reports");
    return res.rowsOfObjects()
  
}

const getTodaysEveningReport = async() => {
    const res = await executeQuery("SELECT * FROM evening_reports WHERE date=$1", getToday())
    if (res) {
        return res.rowsOfObjects()
    }
    return []
}

const addEveningReport = async(report) => {
    await executeQuery('DELETE FROM evening_reports WHERE date = $1', report.date)
    
    await executeQuery(
        'INSERT INTO evening_reports (study_time, sports_time, eating_quality, mood, date, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
        report.studyTime, report.sportsTime, report.eatingQuality, report.mood, report.date, report.userId
    )
}

export { 
    getEveningReports,
    getTodaysEveningReport,
    addEveningReport
};