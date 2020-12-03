let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
    config.database = {}
} else {
    config.database = {
        hostname: "hattie.db.elephantsql.com",
        database: "ejiwdirs",
        user: "ejiwdirs",
        password: "vyC0RYywyOw0ji0elu9m50W8XUXSF2U_",
        port: 5432
    };
}

export { config }; 