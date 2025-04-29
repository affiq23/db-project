USE movie_db;




CREATE TABLE Director (
    director_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    nationality VARCHAR(50)
);

CREATE TABLE Movie (
    movie_id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    release_date DATE NULL,
    director_id INT NOT NULL,
    FOREIGN KEY (director_id) REFERENCES Director(director_id)
    ON DELETE CASCADE
);

CREATE TABLE Actor (
    actor_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    nationality VARCHAR(50)
);

CREATE TABLE Movie_Actor (
    movie_id INT NOT NULL,
    actor_id INT NOT NULL,
    part VARCHAR(50) NOT NULL,
    character_name VARCHAR(50),
    PRIMARY KEY (movie_id, actor_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES Actor(actor_id) ON DELETE CASCADE
);

CREATE TABLE Review (
    review_id INT PRIMARY KEY auto_increment,
    movie_id INT NOT NULL,
    rating DECIMAL(3,1),
    date_of_rating DATE NOT NULL,
    reviewer_name VARCHAR(100),
    review_text TEXT,
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id) ON DELETE CASCADE
);

ALTER TABLE Review ADD COLUMN review_text TEXT;