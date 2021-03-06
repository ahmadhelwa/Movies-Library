"use strict";

require("dotenv").config();

const express = require("express");

const cors = require("cors");

const bodyparser = require("body-parser");

const data = require("./Movie Data//data.json");

const axios = require("axios").default;

const app = express();

const port = process.env.PORT;
const apiKey = process.env.ApiKey;

// 

const url = `postgres://ahmadhelwa:1234@localhost:5432/movie`;

const { Client } = require("pg"); 
// const client = new Client(url);
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", handelhome);
app.get("/favorite", handelfavorite);
app.post("/addMovie", handleAdd);
app.get("/getMovie", handleGet);
app.get("/getMoviebyid/:byid", handleGetbyid);
app.put("/updateMovie/:updatemovie", handleupdate);
app.delete("/deleteMovie", handleDelete);

// const pass = process.env.Pass;
// my api Key

// routes
app.get("/trending", hundleTrending);
app.get("/search", hundleSearch);
app.get("/popular", hundlePopular);
app.get("/id", hundleId);
app.use("*", hundleNotFound);

// functions

function handelhome(req, res) {
  let result = [];
  let data1 = new Data(data.title, data.poster_path, data.overview);
  result.push(data1);
  res.json(result);
}



function handelfavorite(req, res) {
  console.log(res.send("Welcome to Favorite Page"));
}


function hundleTrending(req, res) {
  const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;

  axios
    .get(url)
    .then((showData) => {
      console.log(showData);
      let trendall = showData.data.results.map((trend) => {
        return new Movie(
          trend.id,
          trend.title,
          trend.release_date,
          trend.poster_path,
          trend.overview
        );
      });
      res.json(trendall);
    })

    .catch((error) => {
      console.log(error);
      res.send("Inside catch");
    });
}

function hundleSearch(req, res) {
  let name = req.query.name;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}&language=en-US&page=2`;
  axios
    .get(url)
    .then((showData) => {
      res.json(showData.data.results);
    })
    .catch((error) => {
      console.log(error);
      res.send("inside data");
    });
}

function hundlePopular(req, res) {
  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`;

  axios
    .get(url)
    .then((showData) => {
      res.json(showData.data);
    })
    .catch((error) => {
      console.log(error);
      res.send("inside data");
    });
}

function hundleId(req, res) {
  let id = req.query.id;
  let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&page=2`;
  axios
    .get(url)
    .then((showData) => {
      res.json(showData.data);
    })
    .catch((error) => {
      console.log(error);
      res.send("inside data");
    });
}
// function get & post

function handleAdd(req, res) {
  const { title,  release_date, poster_path , overview , comment } = req.body;

  let sql = "INSERT INTO movie(title,  release_date, poster_path , overview , comment ) VALUES($1, $2 , $3 , $4 ,$5 ) RETURNING *;";

  let values = [title,  release_date, poster_path , overview , comment ];

  client
    .query(sql, values)

    .then((result) => {
      console.log(result.rows);

      return res.status(201).json(result.rows[0]);
    })
    .catch();
}

function handleGet(req, res) {
  let sql = "SELECT * from movie;";

  client
    .query(sql)

    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      hundleNotFound(err, req, res);
    });
}
function handleGetbyid(req, res) {
  const { byid } = req.params;

  let sql = "SELECT * from movie WHERE id=$1;";
  let value = [byid];

  client
    .query(sql, value)

    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      hundleNotFound(err, req, res);
    });
}
function handleupdate(req, res) {
  const { updatemovie } = req.params;
  const { title,  release_date, poster_path , overview , comment  } = req.body;
  let sql = `UPDATE movie  SET title =$1 , release_date=$2 , poster_path=$3  WHERE  id = $4 RETURNING *;`;
  let values = [title, release_date, updatemovie];

  client.query(sql, values).then((result) => {
    res.send("working");
  });
}

function handleDelete(req, res) {
  const deleteMovie = req.query.id;
  let sql = "DELETE from movie WHERE id=$1;";
  let value = [deleteMovie];
  client
    .query(sql, value)
    .then((result) => {
      console.log(result);
      res.status(204);
    })
    .catch();
}

// constrecter

function Data(title, poster_path, overview) {
  this.title = title;
  this.poster_path = poster_path;
  this.overview = overview;
}

function Movie(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}

// after connection to db , start the server
client.connect().then(() => {
  app.listen(port, () => {
    console.log(`server is listening http://localhost:${port}`);
  });
});


function hundleNotFound(req, res) {
  res.status(500).send(" page not 1 found ");
}
