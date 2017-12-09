DROP DATABASE IF EXISTS media_trailerDB;
CREATE database media_trailerDB;

USE media_trailerDB;

CREATE TABLE wishlist
(
    id INT NOT NULL
    AUTO_INCREMENT,
  Title VARCHAR
    (45) NULL,
  Rating VARCHAR
    (45) NULL,
  Genre VARCHAR
    (45) NULL,
  Media VARCHAR
    (45) NULL,
  PRIMARY KEY
    (id)
);


    CREATE TABLE viewed
    (
        id INT NOT NULL
        AUTO_INCREMENT,
  Title VARCHAR
        (45) NULL,
  Rating VARCHAR
        (45) NULL,
  Genre VARCHAR
        (45) NULL,
  Ddate_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY
        (id)
);

        CREATE TABLE deleted
        (
            id INT NOT NULL
            AUTO_INCREMENT,
  Title VARCHAR
            (45) NULL,
  Rating VARCHAR
            (45) NULL,
  Genre VARCHAR
            (45) NULL,
  date_time datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY
            (id)
);


            INSERT INTO wishlist
                (Title, Rating, Genre, Media)
            VALUES
                ("Die Hard", "R", "Action", "MOV"),
                ("Office Space", "R", "Comedy", "MOV"),
                ("Star Wars", "PG", "Action", "MOV"),
                ("Tetris", "E", "Puzzle", "Video Game"),
                ("Call of Duty", "M", "Action", "Video Game"),
                ("Donkey Kong", "E", "Action", "Video Game"),
                ("Friends", "TV-PG", "Comedy", "TV"),
                ("Martin", "TV-PG", "Comedy", "TV"),
                ("The Walking Dead", "TV-MA", "Drama", "TV");

            INSERT INTO viewed
                (Title, Rating, Genre)
            VALUES
                ("Annie", "PG", "Drama"),
                ("Hangover", "R", "Comedy"),
                ("Harry Potter 1", "PG", "Fantasy"),
                ("Ms. Pac Man", "E", "Action"),
                ("NBA 2K17", "T", "Sports"),
                ("Turbo", "E", "Sports"),
                ("Empire", "TV-MA", "Drama"),
                ("Grey's Anatomy", "TV-PG", "Drama"),
                ("Dukes of Hazzard", "TV-PG", "Action");

            INSERT INTO deleted
                (Title, Rating, Genre)
            VALUES
                ("The Office", "TV-14", "Comedy"),
                ("Sienfield", "TV-PG", "Comedy"),
                ("Power", "TV-MA", "Drama"),
                ("Dig Dug", "E", "Action"),
                ("Centipede", "E", "Action"),
                ("Galaga", "E", "Action"),
                ("Good Will Hunting", "R", "Drama"),
                ("The Hobbit", "PG", "Fantasy"),
                ("Jaws", "PG", "Thriller");


            SELECT *
            FROM wishlist;
            SELECT *
            FROM viewed;
            SELECT *
            FROM deleted;

