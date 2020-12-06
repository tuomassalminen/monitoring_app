import { validate, required, minLength, isEmail, invalid } from "./deps.js"
import { getUser } from './services/userService.js'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"

const isReservedEmail = async(email) => {
    const userList = await getUser(email)
    if (userList.length > 0) {
        return invalid("isReservedEmail", { email })
    }
}

export const wrongAuth = (password) => {
    return async function wrongAuthRule(email) {
        const userList = await getUser(email)
        if (userList.length === 0) {
            return invalid("wrongAuth", { email })
        }
        const user = userList[0]
        const hash = user.password;
        const passwordCorrect = await bcrypt.compare(password, hash)
        if (!passwordCorrect) {
            return invalid("wrongAuth", {email})
        }
    }
}

export const passwordsMatch = (password) => {
    return async function passwordsMatchRule(verification) {
        if (password !== verification) {
            return invalid("passwordsMatch", {verification})
        }
    }
}

export const registerValidationRules = {
    email: [required, isEmail, isReservedEmail],
    password: [required, minLength(4)],
    verification: [required]
}


export const registerValidationMessages = {
    messages: {
        "email.isReservedEmail": "Email already in use",
        "password": "Password needs to be 4 or more characters",
        "passwordsMatch": "Passwords do not match"
    }
}

export const loginValidationRules = {
    email: [required, isEmail],
    password: [required]
};

export const loginValidationMessages = {
    messages: {
        "email.wrongAuth": "Email or password wrong",
        "password": "Password required"
    }
}