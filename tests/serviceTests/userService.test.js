import { TestSuite, test } from '../test.deps.js'
import { assertEquals } from '../test.deps.js'
import { getUser, addUser } from '../../services/userService.js'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { executeQuery } from '../../database/database.js'



const userSuite = new TestSuite({
    name: 'userTests:'
})

const testEmail = 'testEmail@mail.com'
const testPassword = 'testPassword'
const testHash = await bcrypt.hash(testPassword)

test(userSuite, "create user and see it in the database", async() => {
    await executeQuery('TRUNCATE users CASCADE')

    await addUser(testEmail, testHash)
    const user = (await getUser(testEmail))[0]
    assertEquals(testEmail, user.email)
    assertEquals(testHash, user.password)
});

test(userSuite, "creating user with existing email doesnt add it", async() => {
    await addUser(testEmail, testHash)
    const userList = await getUser(testEmail)
    assertEquals(1, userList.length)
})