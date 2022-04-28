'use strict'

require('dotenv').config();

const express = require('express');

const cors = require('cors');

// const data =require('./Movie Data//data.json');

const axios = require('axios').default;

const app = express();


app.use(cors());


const port = 3000 ;

// check server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// my api Key
const apiKey = process.env.ApiKey;











// routes
app.get('/trending', hundleTrending);
app.get('/search', hundleSearch);
app.get('/popular', hundlePopular);
app.get('/id', hundleId);
app.get('*' ,hundleNotFound) // error



// error 500

app.use(function (err, req, res, text) {
  console.log(err.stack);
  res.type('taxt/plain');
  res.status(500);
  res.send('Sorry, something went wrong');
})
// error 404
function hundleNotFound(req,res)
{

  res.status(404).send(" page not found ");

}

// functions 

function hundleTrending(req ,res)
{
const  url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`;

     axios.get(url)
    .then(showData => {
     console.log(showData);
     let trendall = showData.data.results.map(trend => {
       
         return new Movie ( trend.id, trend.title, trend.release_date, trend.poster_path, trend.overview);
      
        })
      res.json(trendall);
      

    })
   
     .catch((error) => {
      console.log(error);
      res.send("Inside catch")
    })
}



function hundleSearch(req, res) {
  let id = req.query.id;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${id}&language=en-US&page=2`;
     axios.get(url)
    .then(showData => {
     res.json(showData.data.results)
    })
     .catch((error) => {
      console.log(error);
      res.send("inside data")
    })
}




function hundlePopular(req, res) {

  let url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=2`;

  axios.get(url)
    .then(showData => {
       res.json(showData.data)
    })
    .catch((error) => {
      console.log(error);
      res.send("inside data")
    })
}


function hundleId(req, res) {
  let id = req.query.id;
  let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&page=2`
  axios.get(url)
    .then(showData => {
       res.json(showData.data)
    })
    .catch((error) => {
      console.log(error);
      res.send("inside data")
    })
}

// constrecter 

function Movie(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}






















// app.get('/', handelhome);

// function handelhome(req,res)
// {
// let result = [];
// let data1 = new Data(data.title,data.poster_path ,data.overview)
// result.push(data1);
// res.json(result);
// }

// app.get('/', handelhome);




// function Data(title,poster_path,overview)
// {

// this.title =title;
// this.poster_path= poster_path;
// this.overview= overview;

// }

// app.get('/favorite', handelfavorite)

// function handelfavorite(req,res)
// {

// console.log(res.send("Welcome to Favorite Page"))

// }
