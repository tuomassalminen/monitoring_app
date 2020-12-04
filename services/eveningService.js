import { executeQuery } from '../database/database.js'

const getEveningReports = async() => {
    const res = await executeQuery("SELECT * FROM evening_reports");
    return res.rowsOfObjects()
  
}

export { getEveningReports };