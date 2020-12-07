import * as eveningService from '../../services/eveningService.js'
import { validate } from "../../deps.js"
import * as validation from '../../validations.js'
import { getToday } from '../../utils.js'

const getReport = async(request) => {
    const report = {
        studyTime: null,
        sportsTime: null,
        eatingQuality: 3,
        mood: 3,
        date: getToday(),
        userId: null,
        errors: {},
        success: false
    }
    if (request) {
        const body = request.body()
        const params = await body.value

        report.studyTime = Number(params.get('studyTime')),
        report.sportsTime = Number(params.get('sportsTime')),
        report.eatingQuality = Number(params.get('eatingQuality')),
        report.mood = Number(params.get('mood')),
        report.date = params.get('date')
    }
    return report
}

const showEveningPage= async({render}) => {
    const report = await getReport()
    const data = {
        report
    }
    render('eveningReporting.ejs', data);
}

const postEveningReport = async({request, response, session, render}) => {
    const report = await getReport(request)
    
    const [passes, errors] = await validate(
        report, 
        validation.eveningValidationRules
    )
    
    if (!passes) {
        report.errors = errors
        const data = {
            report
        }
        response.status = 401
        render('eveningReporting.ejs', data)
    } else {
        const user = await session.get('user')
        report.userId = user.id
        await eveningService.addReport(report)
        report.success = true
        const data = {
            report
        }
        response.status = 200
        render('eveningReporting.ejs', data)
    }
}
  
  
export { 
    showEveningPage,
    postEveningReport
}