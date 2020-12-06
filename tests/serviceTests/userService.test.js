import { TestSuite, test } from '../test.deps.js'
import { assertEquals } from '../test.deps.js'
import { getUser, addUser } from '../../services/userService.js'
import { executeQuery } from '../../database/database.js'
import { testEmail, testPassword, testHash} from '../testVariables.js'


const userServiceSuite = new TestSuite({
    name: 'userServiceTests:'
})



test(userServiceSuite, "create user and see it in the database", async() => {
    await executeQuery('TRUNCATE users')

    await addUser(testEmail, testHash)
    const user = (await getUser(testEmail))[0]
    assertEquals(testEmail, user.email)
    assertEquals(testHash, user.password)
});

test(userServiceSuite, "creating user with existing email doesnt add it", async() => {
    await addUser(testEmail, testHash)
    const userList = await getUser(testEmail)
    assertEquals(1, userList.length)
})