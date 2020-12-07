import { TestSuite, test } from '../test.deps.js'
import { assertEquals, assert } from '../test.deps.js'
import * as eveningService from '../../services/eveningService.js'
import { executeQuery } from '../../database/database.js'
import { testMood, testDate, testUserId} from '../testVariables.js'


const eveningServiceSuite = new TestSuite({
    name: 'eveningServiceTests:'
})



test(eveningServiceSuite, "create evening report and see it in database", async() => {
    await executeQuery('TRUNCATE evening_reports')

    const newReport = {
        studyTime: 3,
        sportsTime: 2,
        eatingQuality: 3,
        mood: testMood,
        date: testDate,
        userId: testUserId
    }

    await eveningService.addReport(newReport)
    const reportList = await eveningService.getReportByDate(testDate, testUserId)
    assert(reportList.length > 0)
});

test(eveningServiceSuite, "creating report with the same date replaces the previous one", async() => {

    const newReport = {
        studyTime: 1,
        sportsTime: 4,
        eatingQuality: 2,
        mood: 5,
        date: testDate,
        userId: testUserId
    }

    await eveningService.addReport(newReport)
    const reportList = await eveningService.getReportByDate(testDate, testUserId)
    assertEquals(reportList.length, 1)
    assertEquals(reportList[0].study_time, "1")
});

