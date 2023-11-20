DROP TABLE IF EXISTS dog CASCADE;

CREATE TABLE dogs (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    breed VARCHAR(255) NOT NULL,
    adoption_fee INT NOT NULL,
    admin_id INT REFERENCES admins(id) ON DELETE CASCADE,
    description TEXT,
    photo_url VARCHAR(255) NOT NULL
);