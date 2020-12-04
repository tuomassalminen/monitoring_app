import * as service from '../../services/morningService.js'

const showMorningPage = async({render}) => {
    const data = {
        morningInfos: await service.getMorningReports()
    }
    render('morningReporting.ejs', data);
};

const postMorningReport = async({request, response, session}) => {
    const body = request.body()
    const params = await body.value
    const user = await session.get('user')
    const report = {
        sleepDuration: Number(params.get('sleepDuration')),
        sleepQuality: Number(params.get('sleepQuality')),
        mood: Number(params.get('mood')),
        date: params.get('date'),
        userId: user.id
    }
    await service.addMorningReport(report)

    response.redirect('/behavior/reporting/morning')
}
  
export { showMorningPage, postMorningReport };