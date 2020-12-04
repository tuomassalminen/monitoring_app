import { executeQuery } from '../database/database.js'

const getUser = async(username) => {
    return await executeQuery("SELECT * FROM users WHERE username = $1;", username);
}

const addUser = async(username, hash) => {
    await executeQuery("INSERT INTO users (username, password) VALUES ($1, $2);", username, hash);
}

export { getUser, addUser };