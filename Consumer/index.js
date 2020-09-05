const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
// configura o express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));

// Rotas
app.get("/", (req, res) =>{
    res.statusCode = 200 ;
    res.render('main', {msg: "ola gustavo"});
});


app.listen(8050, () =>{
    console.log("Consumidor em funcionamento na porta 8050..");
});

