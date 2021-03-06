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

DROP TABLE IF EXISTS marks;
CREATE TABLE marks
(
    mark_id SERIAL PRIMARY KEY,
    nickname TEXT,
    subject TEXT,
    mark INTEGER
);
