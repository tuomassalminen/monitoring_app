CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(320) TEXT NOT NULL,
    password CHAR(60) NOT NULL
);

CREATE UNIQUE INDEX ON users((lower(username)));

CREATE TABLE morning_infos (
    id SERIAL PRIMARY KEY,
    sleep_duration DECIMAL
    sleep_quality INTEGER,
    mood INTEGER,
    date, DATE,
    user_id INTEGER REFERENCES users(id)
);

CREATE TABLE evening_infos (
    id SERIAL PRIMARY KEY,
    study_time DECIMAL,
    sports_time DECIMAL,
    eating_quality INTEGER,
    mood INTEGER,
    date DATE,
    user_id INTEGER REFERENCES users(id)
);

