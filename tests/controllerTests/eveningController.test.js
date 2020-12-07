import app from '../../app.js'
import { TestSuite, test } from '../test.deps.js'

import { superoak } from "../test.deps.js";
import { assertEquals, assert } from '../test.deps.js'
import { testEatingQuality, testMood, testDate } from '../testVariables.js'

const eveningControllerSuite = new TestSuite({
    name: 'eveningControllerTests:'
})

test(eveningControllerSuite, 'Negative study time and sports time show error', async() => {
    const testClient = await superoak(app)

    const response = await testClient.post('/behavior/reporting/evening')
        .send(`studyTime=${-1}&sportsTime=${-1}&eatingQuality=${testEatingQuality}&mood=${testMood}&date=${testDate}`)
        .expect(401)

    assert(response.text.includes('studyTime cannot be lower than 0'))
    assert(response.text.includes('sportsTime cannot be lower than 0'))
})
