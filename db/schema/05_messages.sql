DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE messages (
    id SERIAL PRIMARY KEY NOT NULL,
    dog_id INT REFERENCES dogs(id) ON DELETE CASCADE,
    text VARCHAR(255),
    message_time TIMESTAMP
);