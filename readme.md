The app is running in https://monitoringapptume.herokuapp.com/

To run the program locally create a .env file with variables for the database address, or set the env variables from the command line. For testing I set the env variable TEST_ENVIRONMENT=true and the database variables now have TEST_ in front of them.

Then type "deno run --allow-all --unstable app.js" in the command line when you are in the project folder.

To test type "deno test --allow-all --unstable" in the command line

Below are the tables needed for the app.
When creating the test database i dont reference user_id in the report tables, its just "user_id INTEGER"

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE morning_reports (
    id SERIAL PRIMARY KEY,
    sleep_duration DECIMAL,
    sleep_quality INTEGER,
    mood INTEGER,
    date DATE,
    user_id INTEGER REFERENCES users
);

CREATE TABLE evening_reports (
    id SERIAL PRIMARY KEY,
    study_time DECIMAL,
    sports_time DECIMAL,
    eating_quality INTEGER,
    mood INTEGER,
    date DATE,
    user_id INTEGER REFERENCES users
);


