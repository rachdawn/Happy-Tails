DROP TABLE IF EXISTS listing CASCADE;

CREATE TABLE listing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    publish_date DATE,
    active BOOLEAN,
    admin_id INT,
    dog_id INT,
    FOREIGN KEY (admin_id) REFERENCES Admin(Id),
    FOREIGN KEY (dog_id) REFERENCES Dog(id)
);
