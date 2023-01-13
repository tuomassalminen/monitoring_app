The app is running in https://monitoringapptume.herokuapp.com/ ( not anymore;( )

To run the program locally create a .env file with variables for the database address, or set the env variables from the command line. 
For testing I set the env variable TEST_ENVIRONMENT=true and the database variables now have TEST_ in front of them.

Then type "deno run --allow-all --unstable app.js" in the command line when you are in the project folder.

To test type "deno test --allow-all --unstable" in the command line

Below are the tables needed for the app.
When creating the test database i dont reference user_id in the report tables, its just "user_id INTEGER"

CREATE TABLE users (  
&emsp; id SERIAL PRIMARY KEY,  
&emsp; email TEXT NOT NULL,  
&emsp; password CHAR(60) NOT NULL  
);

CREATE UNIQUE INDEX ON users((lower(email)));

CREATE TABLE morning_reports (  
&emsp; id SERIAL PRIMARY KEY,  
&emsp; sleep_duration DECIMAL,  
&emsp; sleep_quality INTEGER,  
&emsp; mood INTEGER,  
&emsp; date DATE,  
&emsp; user_id INTEGER REFERENCES users  
);

CREATE TABLE evening_reports (  
&emsp; id SERIAL PRIMARY KEY,  
&emsp; study_time DECIMAL,  
&emsp; sports_time DECIMAL,  
&emsp; eating_quality INTEGER,  
&emsp; mood INTEGER,  
&emsp; date DATE,  
&emsp; user_id INTEGER REFERENCES users  
);


