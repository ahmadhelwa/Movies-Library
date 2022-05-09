DROP TABLE IF EXISTS movie;

CREATE TABLE IF NOT EXISTS movie (
   
    id  SERIAL PRIMARY KEY ,
    name  varchar(255) ,
    result varchar (255)
   
);