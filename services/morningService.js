import { executeQuery } from '../database/database.js'

const getMorningInfos= async() => {
    const res = await executeQuery("SELECT * FROM morning_infos");
    if (res && res.rowCount > 0) {
        return res.rowsOfObjects();
    }
  
    return 'No morning infos available';
}

export { getMorningInfos };