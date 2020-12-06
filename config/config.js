import "https://deno.land/x/dotenv/load.ts"

let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {
        hostname: Deno.env.get('TEST_HOSTNAME'),
        database: Deno.env.get('TEST_DATABASE'),
        user: Deno.env.get('TEST_USER'),
        password: Deno.env.get('TEST_PASSWORD'),
        port: parseInt(Deno.env.get('TEST_PORT'))
    }
} else {
    config.database = {
        hostname: Deno.env.get('HOSTNAME'),
        database: Deno.env.get('DATABASE'),
        user: Deno.env.get('USER'),
        password: Deno.env.get('PASSWORD'),
        port: parseInt(Deno.env.get('PORT'))
    };
}

export { config }; 