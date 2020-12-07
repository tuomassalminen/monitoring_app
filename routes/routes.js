import { Router } from "../deps.js";
import { showMain } from './controllers/mainController.js'
import { showReportingSelection } from './controllers/reportingController.js'
import * as eveningController from "./controllers/eveningController.js";
import * as morningController from "./controllers/morningController.js";
import * as userController from "./controllers/userController.js";
import * as summaryController from "./controllers/summaryController.js";


const router = new Router()

router.get('/', showMain)
router.get('/auth/register', userController.showRegistration)
router.post('/auth/register', userController.postRegistrationForm)
router.get('/auth/login', userController.showLogin)
router.post('/auth/login', userController.postLoginForm)
router.post('/auth/logout', userController.logoutUser)
router.get('/behavior/reporting', showReportingSelection)
router.get('/behavior/reporting/morning', morningController.showMorningPage)
router.get('/behavior/reporting/evening', eveningController.showEveningPage)
router.post('/behavior/reporting/morning', morningController.postMorningReport)
router.post('/behavior/reporting/evening', eveningController.postEveningReport)
router.get('/behavior/summary', summaryController.showSummaryPage)
router.post('/behavior/summary', summaryController.postChangeDate)


export { router }