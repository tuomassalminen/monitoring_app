import * as env from "https://deno.land/x/dotenv/mod.ts";

let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {}
} else {
    config.database = {
        hostname: env.config()['HOSTNAME'],
        database: env.config()['DATABASE'],
        user: env.config()['USER'],
        password: env.config()['PASSWORD'],
        port: parseInt(env.config()['PORT'])
    };
}

export { config }; 