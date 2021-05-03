DROP DATABASE IF EXISTS moiveTickets;

CREATE DATABASE moiveTickets;

DROP TABLE IF EXISTS movie;
CREATE TABLE movie (
  movie_id INT NOT NULL AUTO_INCREMENT,
  movie_name  VARCHAR(100),
  movie_description VARCHAR(200),
  movie_genre_id INT,

  PRIMARY KEY(movie_id),
  FOREIGN KEY(movie_genre_id) REFERENCES genre(genre_id)
);

DROP TABLE IF EXISTS genre;
CREATE TABLE genre (
  genre_id INT NOT NULL AUTO_INCREMENT,
  genre_name    VARCHAR(100),

  PRIMARY KEY(genre_id)
);

DROP TABLE IF EXISTS showing;
CREATE TABLE showing (
    show_id INT NOT NULL AUTO_INCREMENT,
    show_movie_id INT,
    show_theater_id INT,
    seats VARCHAR(5),
    show_date DATE,

    PRIMARY KEY(show_id),
    FOREIGN KEY(show_movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE,
    FOREIGN KEY(show_theater_id) REFERENCES theater(theater_id) ON DELETE CASCADE 
);

DROP TABLE IF EXISTS ticket;
CREATE TABLE ticket (
    ticket_id INT NOT NULL AUTO_INCREMENT,
    ticket_show_id INT,
    ticket_price DOUBLE,
    seat_no INT NOT NULL,
    
    PRIMARY KEY(ticket_id),
    FOREIGN KEY(ticket_show_id) REFERENCES showing(show_id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS theater;
CREATE TABLE theater (
  theater_id INT NOT NULL AUTO_INCREMENT,
  theater_name VARCHAR(50),
  address VARCHAR(300),

  PRIMARY KEY(theater_id)
);


INSERT INTO genre(genre_name) VALUES("");

INSERT INTO movie(movie_name, movie_description, movie_genre_id) VALUES
("","","",)
("","","",)
("","","",);

INSERT INTO theater(theater_name, address) VALUES("","");

