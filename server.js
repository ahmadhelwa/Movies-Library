const express = require('express');

const data =require('./Movie Data//data.json');


const app = express();
const port = 3000 ;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', handelhome);
app.get('/favorite', handelfavorite)

// function error
app.use(function (err, req, res, text) {
  console.log(err.stack);
  res.type('taxt/plain');
  res.status(500);
  res.send('Sorry, something went wrong');
})

app.use(function (req, res, text) {
  res.status(404);
  res.type('text/plain');
  res.send('Not found');
});


function handelhome(req,res)
{
let result = [];
let data1 = new Data(data.title,data.poster_path ,data.overview)
result.push(data1);
res.json(result);
}

function Data(title,poster_path,overview)
{

this.title =title;
this.poster_path= poster_path;
this.overview= overview;

}

app.get('/favorite', handelfavorite)

function handelfavorite(req,res)
{

console.log(res.send("Welcome to Favorite Page"))

}
