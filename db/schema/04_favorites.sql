DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE favorites (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    User_id INT,
    listing_id INT,
    FOREIGN KEY (User_id) REFERENCES Users(Id),
    FOREIGN KEY (listing_id) REFERENCES Listing(id)
);
