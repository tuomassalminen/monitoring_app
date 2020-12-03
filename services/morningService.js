import { executeQuery } from '../database/database.js'

const getMorningInfos= async() => {
    const res = await executeQuery("SELECT * FROM morning_infos");
    if (res && res.rowCount > 0) {
        return res.rowsOfObjects();
    }
  
    return 'No morning infos available';
}

const addMorningInfo = async(info) => {
    const res = await executeQuery(
        'INSERT INTO morning_infos (sleep_duration, sleep_quality, mood, date, userId) VALUES ($1, $2, $3, NOW(), 1)',
        info.sleepDuration, info.sleepQuality, info.mood
    )
    return res
}

export { getMorningInfos, addMorningInfo };