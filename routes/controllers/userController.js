import { login, register } from '../../services/userService.js'

const loginUser = async({render}) => {
    await login()
}

const registerUser = async({render}) => {
    await register()
}
  
export { loginUser, registerUser };