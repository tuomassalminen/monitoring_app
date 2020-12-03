import { executeQuery } from '../database/database.js'

const getEveningInfos = async() => {
    const res = await executeQuery("SELECT * FROM evening_infos");
    if (res && res.rowCount > 0) {
        return res.rowsOfObjects()
    }
  
    return 'No evening infos available';
}

export { getEveningInfos };