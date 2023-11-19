DROP TABLE IF EXISTS dog CASCADE;

CREATE TABLE dog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT,
    breed VARCHAR(50),
    adoption_fee DECIMAL(10, 2),
    admin_id INT,
    description TEXT,
    photo_url VARCHAR(255),
    FOREIGN KEY (admin_id) REFERENCES Admin(Id)
);