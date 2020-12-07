import app from '../../app.js'
import { TestSuite, test } from '../test.deps.js'
import { superoak } from "../test.deps.js";
import { assertEquals, assert } from '../test.deps.js'
import { testDate } from '../testVariables.js'

const morningControllerSuite = new TestSuite({
    name: 'morningControllerTests:'
})

test(morningControllerSuite, 'Shows correct validation errors', async() => {
    const testClient = await superoak(app)

    const response = await testClient.post('/behavior/reporting/morning')
        .send(`sleepDuration=${-10}&sleepQuality=${10}&mood=${0}&date=${testDate}`)
        .expect(401)
    assert(response.text.includes('sleepDuration cannot be lower than 0'))
    assert(response.text.includes('10 must be between 1 - 5'))
    assert(response.text.includes('0 must be between 1 - 5'))
})
