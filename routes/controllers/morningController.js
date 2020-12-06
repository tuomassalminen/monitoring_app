import * as service from '../../services/morningService.js'
import { validate } from "../../deps.js"
import * as validation from '../../validations.js'
import { getToday } from '../../utils.js'

const getReport = async(request) => {
    const report = {
        sleepDuration: null,
        sleepQuality: 3,
        mood: 3,
        date: getToday(),
        userId: null,
        errors: {},
        success: false
    }
    if (request) {
        const body = request.body()
        const params = await body.value

        report.sleepDuration = Number(params.get('sleepDuration'))
        report.sleepQuality = Number(params.get('sleepQuality')),
        report.mood = Number(params.get('mood')),
        report.date = params.get('date')
    }
    return report
}

const showMorningPage = async({render}) => {
    const report = await getReport()
    const data = {
        report
    }
    render('morningReporting.ejs', data);
};

const postMorningReport = async({request, response, session, render}) => {
    const report = await getReport(request)
    
    const [passes, errors] = await validate(
        report, 
        validation.morningValidationRules
    )
    
    if (!passes) {
        report.errors = errors
        const data = {
            report
        }
        render('morningReporting.ejs', data)
    } else {
        const user = await session.get('user')
        report.userId = user.id
        await service.addMorningReport(report)
        report.success = true
        const data = {
            report
        }
        render('morningReporting.ejs', data)
    }
}
  
export { showMorningPage, postMorningReport };