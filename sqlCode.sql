DROP TABLE IF EXISTS subjects;
CREATE TABLE subjects
(
    subject_id SERIAL PRIMARY KEY,
    subject TEXT,
    description TEXT
);
