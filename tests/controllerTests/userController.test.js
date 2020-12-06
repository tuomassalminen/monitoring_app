import app from '../../app.js'
import { TestSuite, test } from '../test.deps.js'
import { superoak } from "../test.deps.js";
import { addUser } from '../../services/userService.js'
import { assertEquals, assert } from '../test.deps.js'
import { testEmail, testPassword, testHash} from '../testVariables.js'

const userRegisterSuite = new TestSuite({
    name: 'userRegisterTests:'
})

test(userRegisterSuite, 'Invalid email shows correct error', async() => {
    const testClient = await superoak(app)
    const response = await testClient.post('/auth/register')
        .send(`email=asdf`)
        .send(`password=${testPassword}`)
        .send(`verification=${testPassword}`)
        .expect(401)

    assert(response.text.includes('email is invalid'))
})

test(userRegisterSuite, 'Reserved email shows correct error', async() => {
    await addUser(testEmail, testHash)
    const testClient = await superoak(app)
    const response = await testClient.post('/auth/register')
        .send(`email=${testEmail}`)
        .send(`password=${testPassword}`)
        .send(`verification=${testPassword}`)
        .expect(401)

    assert(response.text.includes('Email already in use'))
    
})

test(userRegisterSuite, 'Passwords not matching shows correct error', async() => {
    const testClient = await superoak(app)
    const response = await testClient.post('/auth/register')
        .send(`email=test2@email.com`)
        .send(`password=${testPassword}`)
        .send(`verification=asdf`)
        .expect(401)

    assert(response.text.includes("Passwords do not match"))  
})

const userLoginSuite = new TestSuite({
    name: 'userLoginTests:'
})

test(userLoginSuite, 'Logging with incorrect credentials shows correct error', async() => {
    const testClient = await superoak(app)
    const response = await testClient.post('/auth/login')
        .send(`email=asdf`)
        .send(`password=asdf`)
        .expect(401)

    assert(response.text.includes("Email or password wrong"))  
})

