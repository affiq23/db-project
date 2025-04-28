USE movie_db;
INSERT INTO Director (director_id, first_name, last_name, date_of_birth, nationality)
VALUES (1, 'Frank', 'Darabont', '1959-01-28', 'American');
INSERT INTO Movie (movie_id, title, genre, release_date, director_id)
VALUES (1, 'The Shawshank Redemption', 'Drama', '1994-09-22', 1);
INSERT INTO Actor (actor_id, first_name, last_name, date_of_birth, nationality)
VALUES
(1, 'Tim', 'Robbins', '1958-10-16', 'American'),
(2, 'Morgan', 'Freeman', '1937-06-01', 'American'),
(3, 'Bob', 'Gunton', '1945-11-15', 'American');
INSERT INTO Movie_Actor (movie_id, actor_id, part, character_name)
VALUES
(1, 1, 'Lead', 'Andy Dufresne'),
(1, 2, 'Lead', 'Ellis Boyd "Red" Redding'),
(1, 3, 'Supporting', 'Warden Norton');
INSERT INTO Review (review_id, movie_id, rating, date_of_rating, reviewer_name)
VALUES (1, 1, 9.3, '2023-08-15', 'Movie Buff 101');
INSERT INTO Director (director_id, first_name, last_name, date_of_birth, nationality)
VALUES (2, 'Christopher', 'Nolan', '1970-07-30', 'British-American');
INSERT INTO Movie (movie_id, title, genre, release_date, director_id)
VALUES (2, 'The Dark Knight', 'Action/Crime', '2008-07-18', 2);
INSERT INTO Actor (actor_id, first_name, last_name, date_of_birth, nationality)
VALUES
(4, 'Christian', 'Bale', '1974-01-30', 'British'),
(5, 'Heath', 'Ledger', '1979-04-04', 'Australian'),
(6, 'Aaron', 'Eckhart', '1968-03-12', 'American');
INSERT INTO Movie_Actor (movie_id, actor_id, part, character_name)
VALUES
(2, 4, 'Lead', 'Bruce Wayne / Batman'),
(2, 5, 'Lead', 'Joker'),
(2, 6, 'Supporting', 'Harvey Dent');
INSERT INTO Review (review_id, movie_id, rating, date_of_rating, reviewer_name)
VALUES (2, 2, 9.0, '2023-08-20', 'Cinema Critique');
INSERT INTO Movie (movie_id, title, genre, release_date, director_id)
VALUES (3, 'Interstellar', 'Sci-Fi', '2014-11-07', 2);
INSERT INTO Actor (actor_id, first_name, last_name, date_of_birth, nationality)
VALUES
(7, 'Matthew', 'McConaughey', '1969-11-04', 'American'),
(8, 'Anne', 'Hathaway', '1982-11-12', 'American'),
(9, 'Jessica', 'Chastain', '1977-03-24', 'American');
INSERT INTO Movie_Actor (movie_id, actor_id, part, character_name)
VALUES
(3, 7, 'Lead', 'Joseph Cooper'),
(3, 8, 'Lead', 'Dr. Amelia Brand'),
(3, 9, 'Supporting', 'Murph');
INSERT INTO Review (review_id, movie_id, rating, date_of_rating, reviewer_name)
VALUES (3, 3, 8.6, '2023-08-21', 'Deep Space Reviews');
INSERT INTO Director (director_id, first_name, last_name, date_of_birth, nationality)
VALUES (3, 'David', 'Leitch', '1975-11-16', 'American');
INSERT INTO Movie (movie_id, title, genre, release_date, director_id)
VALUES (4, 'Bullet Train', 'Action/Comedy', '2022-08-05', 3);
INSERT INTO Actor (actor_id, first_name, last_name, date_of_birth, nationality)
VALUES
(10, 'Brad', 'Pitt', '1963-12-18', 'American'),
(11, 'Aaron', 'Taylor-Johnson', '1990-06-13', 'British'),
(12, 'Brian', 'Tyree Henry', '1982-03-31', 'American');
INSERT INTO Movie_Actor (movie_id, actor_id, part, character_name)
VALUES
(4, 10, 'Lead', 'Ladybug'),
(4, 11, 'Supporting', 'Tangerine'),
(4, 12, 'Supporting', 'Lemon');
INSERT INTO Review (review_id, movie_id, rating, date_of_rating, reviewer_name)
VALUES (4, 4, 7.4, '2023-08-22', 'Action Pulse');
INSERT INTO Director (director_id, first_name, last_name, date_of_birth, nationality)
VALUES (4, 'Quentin', 'Tarantino', '1963-03-27', 'American');
INSERT INTO Movie (movie_id, title, genre, release_date, director_id)
VALUES (5, 'Pulp Fiction', 'Crime/Drama', '1994-10-14', 4);
INSERT INTO Actor (actor_id, first_name, last_name, date_of_birth, nationality)
VALUES
(13, 'John', 'Travolta', '1954-02-18', 'American'),
(14, 'Samuel', 'Jackson', '1948-12-21', 'American'),
(15, 'Uma', 'Thurman', '1970-04-29', 'American');
INSERT INTO Movie_Actor (movie_id, actor_id, part, character_name)
VALUES
(5, 13, 'Lead', 'Vincent Vega'),
(5, 14, 'Lead', 'Jules Winnfield'),
(5, 15, 'Supporting', 'Mia Wallace');
INSERT INTO Review (review_id, movie_id, rating, date_of_rating, reviewer_name)
VALUES (5, 5, 8.9, '2023-08-23', 'Cult Classic Reviews')