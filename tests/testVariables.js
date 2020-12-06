import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";


export const testEmail = 'testEmail@mail.com'
export const testPassword = 'testPassword'
export const testHash = await bcrypt.hash(testPassword)