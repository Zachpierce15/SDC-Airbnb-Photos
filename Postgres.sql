CREATE TABLE users (
  id INTEGER PRIMARY KEY NOT NULL,
  username VARCHAR( 50 ),
)

CREATE TABLE locations (
  id INT PRIMARY KEY NOT NULL,
  location VARCHAR( 50 ),
)

CREATE TABLE listings (
  id INTEGER PRIMARY KEY NOT NULL,
  Description VARCHAR( 500 ),
  host_id INTEGER NOT NULL,
  is_saved BOOLEAN NOT NULL,
  location INTEGER NOT NULL,
)
  FOREIGN KEY ( host_id ) REFERENCES users ( id ),
  FOREIGN KEY ( location ) REFERENCES locations ( id ),

CREATE TABLE photos (
  id INTEGER PRIMARY KEY NOT NULL,
  url VARCHAR(100), 
  description VARCHAR(500),
  is_verified BOOLEAN,
  listing INTEGER NOT NULL
  );
  FOREIGN KEY(listing) REFERENCES listings(id)