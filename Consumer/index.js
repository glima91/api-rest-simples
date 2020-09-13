const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
// configura o express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// importa o Axios
const axios = require("axios");

// Estou dizendo para o Express usar o EJS como View engine
app.set('view engine','ejs');
app.use(express.static('public'));

// Configuar Sessão e o Flash
const session = require('express-session');
const flash = require('connect-flash');

app.use(session({
	secret:'sdasdafa58641a24sd21as0anidbaBNUIANDsksmdlskNDjkGUIQQMODSK<L',
	saveUninitialized: true,
	resave: true
}));

app.use(flash());

// Rotas
app.get("/", (req, res) =>{
    res.statusCode = 200 ;
    res.render('login');
});

app.post('/home', (req, res) => {
    var {email, password} = req.body; 	
    
    axios.post("http://localhost:8000/auth",{
        email,
        password
    }).then(axiosResponse =>{
        
        if(axiosResponse.status == '200'){
            res.render('main',{token: axiosResponse.data.token});
        }else{
            res.send("Erro de login");
        }
    }).catch(err => {
        //req.flash('info', 'Falha de login!');
        res.redirect("/");
    });
});




app.listen(8050, () =>{
    console.log("Consumidor em funcionamento na porta 8050..");
});

