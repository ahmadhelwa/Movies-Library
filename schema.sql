DROP TABLE IF EXISTS movie;

CREATE TABLE IF NOT EXISTS movie (
   
  
  
               id  SERIAL PRIMARY KEY ,
    
   
            title varchar(6255)  ,
            release_date varchar(6255) ,
            poster_path  varchar(6255),
            overview varchar(6255) ,
            comment varchar(6255)



);