import { getTodaysEveningReport } from '../../services/eveningService.js'
import { getTodaysMorningReport } from '../../services/morningService.js'

const showReportingSelection = async({render}) => {
    const eveningReportList = await getTodaysEveningReport()
    const morningReportList = await getTodaysMorningReport()
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