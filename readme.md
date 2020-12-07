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

When creating the test database i dont use the references of user_id,
it's just "user_id INTEGER"

