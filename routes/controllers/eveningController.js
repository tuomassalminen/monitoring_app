import { getEveningInfos } from '../../services/eveningService.js'

const showEveningInfos = async({render}) => {
    const data = {
        eveningInfos: await getEveningInfos()
    }
    render('index.ejs', data);
};
  
export { showEveningInfos };