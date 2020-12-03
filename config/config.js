import * as denoenv from '../deps.js'

const {
    HOSTNAME,
    DATABASE,
    USER,
    PASSWORD,
    PORT
} = denoenv.config()

let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {}
} else {
    config.database = {
        hostname: HOSTNAME,
        database: DATABASE,
        user: USER,
        password: PASSWORD,
        port: PORT
    };
}

export { config }; 