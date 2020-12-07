import { TestSuite, test } from '../test.deps.js'
import { assertEquals, assert } from '../test.deps.js'
import * as eveningService from '../../services/eveningService.js'
import { executeQuery } from '../../database/database.js'
import { testSleepDuration, testSleepQuality, testMood, testDate, testUserId} from '../testVariables.js'


const eveningServiceSuite = new TestSuite({
    name: 'eveningServiceTests:'
})



test(morningServiceSuite, "create morning report and see it in database", async() => {
    await executeQuery('TRUNCATE morning_reports')

    const newReport = {
        sleepDuration: testSleepDuration,
        sleepQuality: testSleepQuality,
        mood: testMood,
        date: testDate,
        userId: testUserId
    }

    await morningService.addReport(newReport)
    const reportList = await morningService.getReportByDate(testDate)
    assert(reportList.length > 0)
});

test(morningServiceSuite, "creating report with the same date replaces the previous one", async() => {

    const newReport = {
        sleepDuration: 1,
        sleepQuality: 1,
        mood: 1,
        date: testDate,
        userId: testUserId
    }

    await morningService.addReport(newReport)
    const reportList = await morningService.getReportByDate(testDate)
    assertEquals(reportList.length, 1)
    assertEquals(reportList[0].sleep_duration, "1")
});

