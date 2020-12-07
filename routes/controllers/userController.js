import { getUser, addUser } from '../../services/userService.js'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"
import { validate } from "../../deps.js"
import * as validation from '../../validations.js'


const getData = async(request) => {
    const data = {
        email: "",
        errors: {}
    }
    if (request) {
        const body = request.body()
        const params = await body.value

        data.email = params.get('email')
        data.password = params.get('password')
        data.verification = params.get('verification')
    }
    return data
}

const showLogin = async({render}) => {
    render('login.ejs', await getData())
}

const showRegistration = async({render}) => {
    render('register.ejs', await getData())
}

const postLoginForm = async({request, response, session, render}) => {
    const data = await getData(request)

    // Add email/password verification rule to the login validation object
    let loginValidation = validation.loginValidationRules
    loginValidation.email.push(validation.wrongAuth(data.password))


    const [passes, errors] = await validate(
        data, 
        loginValidation,
        validation.loginValidationMessages
    )

    if (!passes) {
        data.errors = errors
        response.status = 401
        render('login.ejs', data)
    } else {
        const userObj = (await getUser(data.email))[0]
        await session.set('authenticated', true);
        await session.set('user', {
            id: userObj.id,
            email: userObj.email
        });
        response.status = 200
        response.redirect('/');
    }
}

const postRegistrationForm = async({request, response, render}) => {
    const data = await getData(request)

    // Add passwords matching rule
    let registerValidation = validation.registerValidationRules
    registerValidation.verification.push(validation.passwordsMatch(data.password))
    
    const [passes, errors] = await validate(
        data, 
        registerValidation,
        validation.registerValidationMessages
    )
    if (!passes) {
        data.errors = errors
        response.status = 401
        render('register.ejs', data)
    } else {
        const hash = await bcrypt.hash(data.password);
        await addUser(data.email, hash)
        response.status = 200
        response.redirect('/')
    }
};

const logoutUser = async({session, response}) => {
    await session.set('authenticated', false)
    await session.set('user', null)
    response.redirect('/')
}
  
export { 
    showLogin, 
    showRegistration,
    postLoginForm ,
    postRegistrationForm,
    logoutUser
};