import { getUser, addUser } from '../../services/userService.js'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const showLogin = async({render}) => {
    render('login.ejs')
}

const showRegistration = async({render}) => {
    render('register.ejs')
}

const postLoginForm = async({request, response, session}) => {
    const body = request.body();
    const params = await body.value;
  
    const username = params.get('username');
    const password = params.get('password');
  
    // check if the email exists in the database
    const res = await getUser(username)
    if (res.rowCount === 0) {
        response.body = 'Username reserved'
        return
    }
  
    // take the first row from the results
    const userObj = res.rowsOfObjects()[0];
  
    const hash = userObj.password;
  
    const passwordCorrect = await bcrypt.compare(password, hash);
    if (!passwordCorrect) {
        response.body = "Password not correct"
        return;
    }
  
    await session.set('authenticated', true);
    await session.set('user', {
        id: userObj.id,
        username: userObj.username
    });
    response.redirect('/');
}

const postRegistrationForm = async({request, response}) => {
    const body = request.body();
    const params = await body.value;
    
    const username = params.get('username');
    const password = params.get('password');
    const verification = params.get('verification');
  
    if (password !== verification) {
      response.body = 'The entered passwords did not match';
      return;
    }
  
    const existingUsers = await getUser(username);
    if (existingUsers.rowCount > 0) {
      response.body = 'The username is already reserved.';
      return;
    }
  
    const hash = await bcrypt.hash(password);
    await addUser(username, hash)
    response.redirect('/')
};
  
export { 
    showLogin, 
    showRegistration,
    postLoginForm ,
    postRegistrationForm
};