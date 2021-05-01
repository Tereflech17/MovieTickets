USE test;

CREATE TABLE movie
(
  id            INT unsigned NOT NULL AUTO_INCREMENT,
  name          VARCHAR(50) NOT NULL,
  description   VARCHAR(200) NOT NULL,
  genre         VARCHAR(20) NOT NULL,
  PRIMARY KEY   (id)
);

INSERT INTO movie (movie_name, movie_description, movie_genre_id) VALUES 
      ('Shadow And Bone', 'Dark forces conspire against orphan mapmaker Alina Starkov when she unleashes an extraordinary power that could change the fate of her war-torn world', 1),
       ('The Sleep Over', 'A moms hidding past. A high-end heist, A string of clues... and spy gadgets? The sleepover just got interesting',2),
        ('Stowaway', 'A three-person crew on a mission to Mars faces an impossible choice when an unplanned passenger jeopardizes the lives of everyone on board', 3);


INSERT INTO genre (genre_name) VALUES ('Fantasy'), ('Action & Adventure'), ('Drama');

INSERT INTO theater (theater_name, address) VAlUES ('Cinemakr Tinseltown', '2291 Buffalo Rd, NY 14624');
INSERT INTO theater (theater_name, address) VAlUES ('AMC','2190 Empire Blvd, Webster NY 14580'); 
INSERT INTO theater (theater_name, address) VAlUES ('Film Forum','209 W Huston St. New York, NY 10014');