import { Router } from "../deps.js";
import { showMain } from './controllers/mainController.js'
import * as eveningController from "./controllers/eveningController.js";
import * as morningController from "./controllers/morningController.js";
import * as userController from "./controllers/userController.js";


const router = new Router()

router.get('/', showMain)
router.get('/morning', morningController.showMorningInfos)
router.post('/morning', morningController.postMorningInfos)


export { router }