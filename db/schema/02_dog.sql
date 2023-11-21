DROP TABLE IF EXISTS dogs CASCADE;

CREATE TABLE dogs (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    breed VARCHAR(255) NOT NULL,
    adoption_fee INT NOT NULL,
    description TEXT,
    photo_url VARCHAR(255) NOT NULL
);