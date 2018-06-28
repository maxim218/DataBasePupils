DROP TABLE IF EXISTS subjects;
CREATE TABLE subjects
(
    subject_id SERIAL PRIMARY KEY,
    subject TEXT,
    description TEXT
);

DROP TABLE IF EXISTS pupils;
CREATE TABLE pupils
(
    pupil_id SERIAL PRIMARY KEY,
    nickname TEXT,
    age INTEGER
);
