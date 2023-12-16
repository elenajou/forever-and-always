-- for table A01363528_user

CREATE TABLE A01363528_user (
  ID int NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(60),
  password VARCHAR(50),
  PRIMARY KEY (ID)
);

-- 1:1 with user table/entity
CREATE TABLE A01363528_user_timeline (
  ID int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  post_date DATETIME NOT NULL,
  post_text VARCHAR(150),
  post_time TIME,
  num_of_views int NOT NULL,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id) REFERENCES A01363528_user(ID) ON UPDATE CASCADE ON DELETE CASCADE
);
