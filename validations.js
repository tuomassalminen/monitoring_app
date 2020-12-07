import { required, minLength, isEmail, invalid, isNumber, isInt, numberBetween, minNumber } from "./deps.js"
import { getUser } from './services/userService.js'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"

const isReservedEmail = async(email) => {
    const userList = await getUser(email)
    if (userList.length > 0) {
        return invalid("isReservedEmail", { email })
    }
}

const wrongAuth = (password) => {
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

const passwordsMatch = (password) => {
    return async function passwordsMatchRule(verification) {
        console.log(password)
        console.log(verification)
        if (password !== verification) {
            return invalid("passwordsMatch", {verification})
        }
    }
}

const registerValidationRules = {
    email: [required, isEmail, isReservedEmail],
    password: [required, minLength(4)],
    verification: [required]
}


const registerValidationMessages = {
    messages: {
        "email.isReservedEmail": "Email already in use",
        "password": "Password needs to be 4 or more characters",
        "passwordsMatch": "Passwords do not match"
    }
}

const loginValidationRules = {
    email: [required, isEmail],
    password: [required]
};

const loginValidationMessages = {
    messages: {
        "email.wrongAuth": "Email or password wrong",
        "password": "Password required"
    }
}

const eveningValidationRules = {
    studyTime: [required, isNumber, minNumber(0)],
    sportsTime: [required, isNumber, minNumber(0)],
    eatingQuality: [required, isInt, numberBetween(1, 5)],
    mood: [required, isInt, numberBetween(1, 5)],
    date: [required]
}

const morningValidationRules = {
    sleepDuration: [required, isNumber, minNumber(0)],
    sleepQuality: [required, isInt, numberBetween(1, 5)],
    mood: [required, isInt, numberBetween(1, 5)],
    date: [required]
}

export {
    loginValidationMessages,
    loginValidationRules,
    registerValidationMessages,
    registerValidationRules,
    eveningValidationRules,
    morningValidationRules,
    passwordsMatch,
    wrongAuth
}