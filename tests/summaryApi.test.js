import app from '../app.js'
import { TestSuite, test } from './test.deps.js'
import { superoak } from "./test.deps.js";
import { assertEquals, assert } from './test.deps.js'
import * as eveningService from '../services/eveningService.js'
import * as morningService from '../services/morningService.js'
import { getWeekAgo, getToday, getYesterday } from '../utils.js'
import { executeQuery } from '../database/database.js';

const summaryApiSuite = new TestSuite({
    name: 'summaryApiTests:'
})

const morningReport1 = {
    sleepDuration: 5,
    sleepQuality: 4,
    mood: 3,
    date: getWeekAgo(),
    userId: 1
}
const morningReport2 = {
    sleepDuration: 6,
    sleepQuality: 2,
    mood: 4,
    date: getYesterday(),
    userId: 1
}
const morningReport3 = {
    sleepDuration: 7,
    sleepQuality: 3,
    mood: 2,
    date: getToday(),
    userId: 2
}
const eveningReport1 = {
    studyTime: 4,
    sportsTime: 5,
    eatingQuality: 3,
    mood: 2,
    userId: 1,
    date: getWeekAgo()
}
const eveningReport2 = {
    studyTime: 3,
    sportsTime: 3,
    eatingQuality: 5,
    mood: 5,
    userId: 1,
    date: getYesterday()
}
const eveningReport3 = {
    studyTime: 2,
    sportsTime: 4,
    eatingQuality: 3,
    mood: 2,
    userId: 2,
    date: getToday()
}

const morningReport4 = {
    sleepDuration: 7,
    sleepQuality: 3,
    mood: 4,
    date: '2019-01-01',
    userId: 1
}


test(summaryApiSuite, '/api/summary show average of all users from last week', async() => {
    await executeQuery('TRUNCATE evening_reports')
    await executeQuery('TRUNCATE morning_reports')

    await eveningService.addReport(eveningReport1)
    await eveningService.addReport(eveningReport2)
    await eveningService.addReport(eveningReport3)
    await morningService.addReport(morningReport1)
    await morningService.addReport(morningReport2)
    await morningService.addReport(morningReport3)
    await morningService.addReport(morningReport4)

    const testClient = await superoak(app)
    const response = await testClient.get('/api/summary')
    assertEquals(Number(response.body.sleepDuration), 6)
    assertEquals(Number(response.body.sleepQuality), 3)
    assertEquals(Number(response.body.sportsTime), 4)
    assertEquals(Number(response.body.studyTime), 3)
    assertEquals(Number(response.body.mood), 3)
})

const eveningReport4 = {
    studyTime: 5,
    sportsTime: 4,
    eatingQuality: 2,
    mood: 2,
    userId: 2,
    date: '2019-01-01'
}
const eveningReport5 = {
    studyTime: 4,
    sportsTime: 2,
    eatingQuality: 3,
    mood: 3,
    userId: 3,
    date: '2019-01-01'
}

test(summaryApiSuite, '/api/summary/:year/:month/:day shows average of selected date', async() => {
    await eveningService.addReport(eveningReport4)
    await eveningService.addReport(eveningReport5)

    const testClient = await superoak(app)
    const response = await testClient.get('/api/summary/2019/1/1')
    assertEquals(Number(response.body.sleepDuration), 7)
    assertEquals(Number(response.body.sleepQuality), 3)
    assertEquals(Number(response.body.sportsTime), 3)
    assertEquals(Number(response.body.studyTime), 4.5)
    assertEquals(Number(response.body.mood), 3)
})