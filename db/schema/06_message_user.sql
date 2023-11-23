DROP TABLE IF EXISTS message_user CASCADE;

CREATE TABLE message_user (
    id SERIAL PRIMARY KEY NOT NULL,
    message_id INT REFERENCES messages(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);
