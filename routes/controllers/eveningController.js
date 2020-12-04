import * as service from '../../services/eveningService.js'

const showEveningPage= async({render}) => {
    const data = {
        eveningInfos: await service.getEveningReports()
    }
    render('eveningReporting.ejs', data);
};
  
export { showEveningPage };