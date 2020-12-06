import * as service from '../../services/eveningService.js'

const showEveningPage= async({render}) => {
    const data = {
        eveningInfos: await service.getEveningReports()
    }
    render('eveningReporting.ejs', data);
}

const postEveningReport = async({request, response, session}) => {
    const body = request.body()
    const params = await body.value
    const user = await session.get('user')
    const report = {
        studyTime: Number(params.get('studyTime')),
        sportsTime: Number(params.get('sportsTime')),
        eatingQuality: Number(params.get('eatingQuality')),
        mood: Number(params.get('mood')),
        date: params.get('date'),
        userId: user.id
    }
    await service.addEveningReport(report)

    response.redirect('/behavior/reporting/evening')
}
  
  
export { 
    showEveningPage,
    postEveningReport
}