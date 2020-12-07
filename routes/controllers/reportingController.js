import * as eveningService from '../../services/eveningService.js'
import * as morningService from '../../services/morningService.js'
import { getToday } from '../../utils.js'


const showReportingSelection = async({render, session}) => {
    const user = await session.get('user')
    const eveningReportList = await eveningService.getReportByDate(getToday(), user.id)
    const morningReportList = await morningService.getReportByDate(getToday(), user.id)
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