import * as eveningService from '../../services/eveningService.js'
import * as morningService from '../../services/morningService.js'
import { getToday } from '../../utils.js'


const showReportingSelection = async({render}) => {
    const eveningReportList = await eveningService.getReportByDate(getToday())
    const morningReportList = await morningService.getReportByDate(getToday())
    let morningDone = false
    let eveningDone = false
    if (morningReportList.length > 0) {
        morningDone = true
    }
    if (eveningReportList.length > 0) {
        eveningDone = true
    }
    const data = {
        morningDone,
        eveningDone
    }
    render('reportingSelection.ejs', data);
};
  
export { showReportingSelection };