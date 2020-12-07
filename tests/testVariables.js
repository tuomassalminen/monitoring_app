import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";


export const testEmail = 'testEmail@mail.com'
export const testPassword = 'testPassword'
export const testHash = await bcrypt.hash(testPassword)

export const testSleepDuration = 10
export const testSleepQuality = 5
export const testMood = 3
export const testDate = '2011-02-03' 
export const testUserId = 1

export const testEatingQuality = 1
export const testSportsTime = 10
export const testStudyTime = 10