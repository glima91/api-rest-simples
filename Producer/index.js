// API REST COM EXPRESS E JWT

// configura o express
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configura o CORS para permitir o acesso do Consumer a API
const cors = require('cors');
app.use(cors());

// Configura JWT (chave de acesso)
const jwt = require("jsonwebtoken");
const JWTSecret = "16a5s11af5fasF54A16SD1A65W161d56asd1wd53d0HJMU1YJ";

// Middleware
function auth(req,res,next){
    const authToken = req.headers['authorization'];
    
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, JWTSecret, (err, data)=>{
            if(err){
                res.status(401); //não autorizado
                res.json({err: "Token inválido!"});
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
        
                next();
            }
        });
    }else{
        res.status(401); //não autorizado
        res.json({err: "Token inválido!"});
    }
    
}





// Banco de dados falso
var DB = {
    games: [
        {
            id: 23,
            title: "Call of Duty",
            year: 2019,
            price: 200
        },
        {
            id: 65,
            title: "Sea of Thieves",
            year: 2018,
            price: 150
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2013,
            price: 100
        }
    ],
    users: [
        {
            id: 1,
            name: "admin",
            email: "admin",
            password: "123456"
        },
        {
            id: 2,
            name: "convidado",
            email: "convidado@email.com",
            password: "111111"
        }
    ]
}

// Rotas
app.post('/auth', (req, res) => {
    var {email, password} = req.body;
    if(email != undefined){
        var user = DB.users.find(u => u.email == email);
        if(user != undefined){
            if(user.password == password){
                // informações que serão associadas ao token, tempo que o token expira, etc
                jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn:'48h'},(err,token) => {
                    if(err){
                        res.status(400);
                        res.json({err:"Falha interna"});
                    }else{
                        res.status(200);
                        res.json({token: token});
                    }
                });
            }else{
                res.status(401);
                res.json({err: "Credenciais inválidas!"});
            }
        }else{
            res.status(404);
            res.json({err: "O email enviado não existe na base de dados!"});
        }
    }else{
        res.status(400);
        res.json({err: "O email enviado é inválido!"});
    }

});

app.get("/games", auth,(req, res) =>{
    res.statusCode = 200 ;
    res.json(DB.games);
});

app.get('/game/:id', (req, res) => {
    
    if(isNaN(req.params.id)){
        // requisição inválida
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);
        
        if(game != undefined){
            // ok, deu certo!
            res.statusCode = 200;
            res.json(game);
        } else {
            // não encontrado
            res.sendStatus(404);
        }
        
    }
});

app.post('/game', (req, res) => {
    var { title, price, year } = req.body;

    DB.games.push({
        id: new Date().getTime(), // obtem tempo em ms
        title,
        price,
        year

    });

    res.sendStatus(200);
	
});

// DELETE apaga os dados
app.delete('/game/:id', (req, res) => {
    
    if(isNaN(req.params.id)){
        // requisição inválida
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            // não encontrado
            res.sendStatus(404);
        } else {
            DB.games.splice(index,1);
            res.sendStatus(200);

        }
    }
});


// PUT permite atualizar dados
app.put('/game/:id', (req, res) => {

    if(isNaN(req.params.id)){
        // requisição inválida
        res.sendStatus(400);
    } else {
        var id = parseInt(req.params.id);

        var game = DB.games.find(g => g.id == id);
        
        if(game != undefined){
            
            var { title, price, year } = req.body;
        
            if(title != undefined){
                game.title = title;
            }
            if(price != undefined){
                game.price = price;
            }
            if(year != undefined){
                game.year = year;
            }
    
           
            // ok, deu certo!
            res.sendStatus(200);
        } else {
            // não encontrado
            res.sendStatus(404);
        }
        
    }
    
});

// Inicializa o servidor
var porta = 8000;
app.listen(porta, () =>{
    console.log("API REST em funcionamento na porta " + porta);
});

