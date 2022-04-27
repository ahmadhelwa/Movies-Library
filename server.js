const express = require('express');

const data =require('./Movie Data//data.json');


const app = express();
const port = 3000 ;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', handelhome);

function handelhome(req,res)
{
let result = [];
let data1 = new Data(data.title,data.poster_path ,data.overview)
result.push(data1);
res.json(result);
}

app.get('/', handelhome);




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
