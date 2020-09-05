const express = require("express");
const bodyParser = require("body-parser");

// configura o express
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


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
    ]
}

// Rotas
app.get("/games", (req, res) =>{
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

app.listen(8000, () =>{
    console.log("API em funcionamento..");
});

